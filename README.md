# Shout!

Make text shout.

## Deployment

This project uses AWS CDK for infrastructure and GitHub Actions with OIDC for automated deployments.

### Prerequisites

- Node.js 22+
- AWS CLI configured with appropriate credentials
- An AWS account with administrator access
- A domain name managed in Route 53 (or ability to delegate DNS)
- [just](https://github.com/casey/just) command runner (optional but recommended)

### Initial Setup

#### 1. Configure AWS SSO (if using SSO)

```bash
just sso-login
# or with a specific profile:
just sso-login myprofile
```

#### 2. Bootstrap CDK

Bootstrap CDK in your AWS account (one-time setup per account/region):

```bash
just bootstrap
```

This sets up the necessary S3 buckets and IAM roles for CDK deployments.

#### 3. Deploy OIDC Stack

Deploy the OIDC provider and IAM role for GitHub Actions (one-time setup):

```bash
just deploy-oidc
```

This creates:
- An OpenID Connect provider for GitHub Actions
- An IAM role (`GitHubActionsShoutDeployRole`) that GitHub Actions can assume
- Necessary permissions for deploying the application

**Important**: After deployment, note the Role ARN from the output. You'll need to add this as a GitHub repository secret.

#### 4. Configure GitHub Secrets

Add the following secret to your GitHub repository:

- `AWS_ROLE_ARN`: The ARN of the `GitHubActionsShoutDeployRole` (output from step 3)

Navigate to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

### Manual Deployment

To deploy all stacks manually:

```bash
just deploy
```

This will:
1. Build the web application
2. Deploy the DNS stack (Route 53 hosted zone)
3. Deploy the Certificate stack (ACM certificate in us-east-1 for CloudFront)
4. Deploy the Infrastructure stack (S3, CloudFront, and application deployment)

To deploy a specific stack:

```bash
just deploy-stack ShoutInfraStack
```

### Automated Deployment

Once the OIDC stack is deployed and GitHub secrets are configured, every push to the `main` branch will automatically:

1. Build the application
2. Deploy infrastructure changes to AWS using OIDC authentication (no long-lived credentials needed)

### Architecture

The infrastructure consists of four CDK stacks:

1. **ShoutOidcStack**: GitHub OIDC provider and IAM role for CI/CD
2. **ShoutDNSStack**: Route 53 hosted zone for DNS management
3. **ShoutCertificateStack**: ACM certificate for HTTPS (deployed in us-east-1)
4. **ShoutInfraStack**: S3 bucket, CloudFront distribution, and application deployment

### Development

Run the application locally:

```bash
just dev
```

Build the application:

```bash
just build
```

Preview the built application:

```bash
just preview
```

### Troubleshooting

**OIDC Authentication Fails**: Ensure the GitHub repository and branch names in [infra/bin/infra.ts](infra/bin/infra.ts#L19-L21) match your actual repository.

**Certificate Validation Hangs**: Ensure you've delegated your domain's nameservers to the Route 53 hosted zone created by the DNS stack.

**Deployment Permission Errors**: The GitHub Actions role has AdministratorAccess for simplicity. In production, scope down to specific permissions needed for CDK deployments.
