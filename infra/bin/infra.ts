#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DNSStack } from "../lib/dns-stack";
import { CertificateStack } from "../lib/certificate-stack";
import { InfraStack } from "../lib/infra-stack";

const app = new cdk.App();

const env = {
  account: process.env.AWS_ACCOUNT_ID || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.AWS_REGION || process.env.CDK_DEFAULT_REGION,
};

if (!env.account || !env.region) {
  throw new Error(
    "AWS account and region must be set via CDK_DEFAULT_ACCOUNT/CDK_DEFAULT_REGION " +
    "or AWS_ACCOUNT_ID/AWS_REGION environment variables, or via AWS CLI configuration."
  );
}

// DNS stack - Route53 is global, but we create it in the primary region
const dnsStack = new DNSStack(app, "ShoutDNSStack", {
  env: {
    account: env.account,
    region: env.region,
  },
  crossRegionReferences: true,
});

// Certificate stack - must be in us-east-1 for CloudFront
const certificateStack = new CertificateStack(
  app,
  "ShoutCertificateStack",
  dnsStack.hostedZone,
  {
    env: {
      account: env.account,
      region: "us-east-1",
    },
    crossRegionReferences: true,
  }
);
certificateStack.addDependency(dnsStack);

// Infrastructure stack - in primary region
const infraStack = new InfraStack(
  app,
  "ShoutInfraStack",
  certificateStack.certificate,
  dnsStack.hostedZone,
  {
    env: {
      account: env.account,
      region: env.region,
    },
    crossRegionReferences: true,
  }
);
infraStack.addDependency(certificateStack);
infraStack.addDependency(dnsStack);
