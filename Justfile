# Project commands for local run and deployment

default: help

help:
	@echo "Available recipes:"
	@just --list

# Run the web app locally
dev:
	npm run dev

# Build the web app
build:
	npm run build

# Preview the built app locally
preview:
	npm run preview

# Login to AWS via SSO (defaults to the 'default' profile)
sso-login profile="default":
	aws sso login --profile {{profile}}

# Bootstrap CDK (uses the region from your logged-in profile)
bootstrap:
	cd infra && npm run cdk -- bootstrap

# Deploy all stacks (DNS → Certificate → Infra)
deploy:
	# Build the web app before deploying infrastructure
	npm run build
	# Deploy stacks
	cd infra && npm run cdk -- deploy ShoutDNSStack ShoutCertificateStack ShoutInfraStack --require-approval never

# Deploy a single stack by name
deploy-stack stack="ShoutInfraStack":
	# Build the web app before deploying selected stack
	npm run build
	# Deploy selected stack
	cd infra && npm run cdk -- deploy {{stack}} --require-approval never
