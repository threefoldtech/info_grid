---
title: "Network Restrictions"
sidebar_position: 217
---

# Network Restrictions

When deploying VMs on the ThreeFold Grid, it's important to understand the network restrictions that apply based on your deployment configuration. These restrictions affect which ports are available for your applications and services.

## VM Network Access Types

### VMs without IPv4

When you deploy a VM without a public IPv4 address:

```
VM without IPv4: restrictions on ports 25, 465 and 587
```

- **Restricted ports**: 25, 465, 587
- **Affected services**: SMTP (email) services
- **Impact**: You cannot run email servers or send emails directly from these VMs
- **Recommended for**: Web applications, databases, development environments, and most standard services

### VMs with IPv4

When you deploy a VM with a public IPv4 address:

```
VM with IPv4: no restrictions
```

- **Port restrictions**: None
- **Full access**: All ports are available
- **Impact**: You can run any service, including email servers
- **Recommended for**: Production email services, mail servers, or applications requiring unrestricted network access

## Planning Your Deployment

### Before You Deploy

Consider these questions when planning your VM deployment:

1. **Do you need to send emails?** If yes, deploy with IPv4
2. **Will you run an email server?** If yes, deploy with IPv4
3. **Is this a web application only?** VMs without IPv4 are sufficient and more cost-effective
4. **Do you need specific port access?** Check if ports 25, 465, or 587 are required

### Cost Considerations

- VMs without IPv4 are typically more cost-effective
- IPv4 addresses may incur additional costs
- Most applications don't require the restricted ports

## Workarounds for Email Services

If you need email functionality but want to use a VM without IPv4:

1. **Use external email services** (Gmail SMTP, SendGrid, Mailgun, etc.)
2. **Deploy a separate email server** on a VM with IPv4
3. **Use email APIs** instead of SMTP protocols

## Technical Details

The restrictions are implemented at the Zero-OS network level to prevent spam and maintain network integrity. For technical implementation details, see the [Network Restrictions](../../../knowledge_base/technology_toc/primitives_toc/network_toc/network_restrictions) in the knowledge base.