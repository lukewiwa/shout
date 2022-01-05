/* eslint no-new:0 */
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as alias from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const FULLY_QUALIFIED_DOMAIN = process.env.FULLY_QUALIFIED_DOMAIN || "";
    const SUB_DOMAIN = process.env.SUB_DOMAIN || "";

    const DOMAIN_NAME = `${SUB_DOMAIN}.${FULLY_QUALIFIED_DOMAIN}`;

    const hostedZone = route53.HostedZone.fromLookup(this, "ShoutHostedZone", {
      domainName: FULLY_QUALIFIED_DOMAIN,
    });

    const websiteBucket = new s3.Bucket(this, "ShoutPwaBucket", {
      bucketName: DOMAIN_NAME,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    new s3deploy.BucketDeployment(this, "ShoutDeployPwa", {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: websiteBucket,
      retainOnDelete: false,
    });

    const shoutCertificate = new acm.DnsValidatedCertificate(
      this,
      "ShoutCert",
      {
        domainName: DOMAIN_NAME,
        hostedZone,
        region: "us-east-1",
      }
    );

    const distribution = new cloudfront.Distribution(this, "ShoutPwaDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [DOMAIN_NAME],
      certificate: shoutCertificate,
    });

    new route53.ARecord(this, "ShoutAliasRecord", {
      zone: hostedZone,
      recordName: DOMAIN_NAME,
      target: route53.RecordTarget.fromAlias(
        new alias.CloudFrontTarget(distribution)
      ),
    });
  }
}
