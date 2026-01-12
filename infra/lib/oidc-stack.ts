import { Stack, StackProps, CfnOutput, Duration } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export interface OidcStackProps extends StackProps {
  /**
   * GitHub organization or username
   * @default - uses "lukewiwa" if not provided
   */
  readonly githubOrg?: string;

  /**
   * GitHub repository name
   * @default - uses "shout" if not provided
   */
  readonly githubRepo?: string;

  /**
   * GitHub branches that can assume the role
   * @default - ["master"]
   */
  readonly githubBranches?: string[];
}

export class OidcStack extends Stack {
  public readonly deployRole: iam.Role;

  constructor(scope: Construct, id: string, props?: OidcStackProps) {
    super(scope, id, props);

    const githubOrg = props?.githubOrg ?? "lukewiwa";
    const githubRepo = props?.githubRepo ?? "shout";
    const githubBranches = props?.githubBranches ?? ["master"];

    // Create the GitHub OIDC provider
    const githubProvider = new iam.OpenIdConnectProvider(
      this,
      "GitHubOidcProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    // Create the IAM role that GitHub Actions will assume
    this.deployRole = new iam.Role(this, "GitHubActionsDeployRole", {
      roleName: "GitHubActionsShoutDeployRole",
      assumedBy: new iam.FederatedPrincipal(
        githubProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": githubBranches.map(
              (branch) => `repo:${githubOrg}/${githubRepo}:ref:refs/heads/${branch}`
            ),
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      description: "Role assumed by GitHub Actions for deploying Shout application",
      maxSessionDuration: Duration.hours(1),
    });

    // Grant administrator access for CDK deployments
    // Note: In production, you should scope this down to specific permissions
    this.deployRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
    );

    // Output the role ARN for use in GitHub Actions
    new CfnOutput(this, "DeployRoleArn", {
      value: this.deployRole.roleArn,
      description: "ARN of the IAM role for GitHub Actions to assume",
      exportName: "GitHubActionsDeployRoleArn",
    });
  }
}
