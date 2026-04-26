# Lesgo Project - Workflow

## Workflow

**deploy.yml** - Build and Deploy workflow

Triggers:
- Push to main branch
- Pull requests to main
- Manual dispatch

Jobs:
- `build` - Builds and pushes backend/frontend Docker images to ghcr.io
- `deploy` - Deploys to Docker Host using docker-compose

**Trigger workflow**:
```bash
gh workflow run deploy.yml --repo creatorxperience/lesgo
```

## Notes

- Uses GitHub-hosted runners (ubuntu-latest)
- Both build and deploy jobs run in the cloud