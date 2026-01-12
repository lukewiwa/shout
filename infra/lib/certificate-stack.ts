import {
    aws_certificatemanager as acm,
    aws_route53 as route53,
    Stack,
    StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { FULLY_QUALIFIED_DOMAIN } from "./settings";

export class CertificateStack extends Stack {
    public certificate: acm.Certificate;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const hostedZone = route53.HostedZone.fromLookup(
            this,
            "ShoutHostedZone",
            {
                domainName: FULLY_QUALIFIED_DOMAIN,
            }
        );

        this.certificate = new acm.Certificate(this, "ShoutCertificate", {
            domainName: FULLY_QUALIFIED_DOMAIN,
            validation: acm.CertificateValidation.fromDns(hostedZone),
        });
    }
}
