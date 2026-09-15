# Parking Mate UK MCP

Connect an AI assistant to Parking Mate UK for parking ticket assessment, service intake and secure existing-case handling.

**Remote endpoint:** `https://mcp.parkingmateuk.com/mcp`

[Platform guide](https://parkingmateuk.com/platform/agents) | [Appeal services](https://parkingmateuk.com/appeal-services) | [Check your PCN](https://parkingmateuk.com/appeal-form)

This is the public connection guide for Parking Mate UK's hosted MCP service. It is not the server source code and contains no customer records or credentials.

## What your assistant can do

- **Start a free assessment:** send the actual notice text and circumstances for a quick private parking assessment.
- **Start the relevant service:** collect the complete information and source documents required for full intake, then return the assessment and payment link. Parking Mate UK's appeal services cover case-specific preparation, submission and ongoing handling.
- **Continue an existing case:** start the secure verification journey, ask for updates or share correspondence with the AI Case Manager.

A connection is not an appeal submission. The quick assessment does not create a case, take payment, draft a letter or submit an appeal. Paid services start from GBP 9.99; your AI client's own charges are separate. Review [service scope and pricing](https://parkingmateuk.com/appeal-services) before proceeding.

## Connect

Use **Streamable HTTP** with the exact URL above. Public initialization and tool discovery require no Parking Mate UK API key. Access to existing cases has a separate verification journey; a case identifier alone does not grant access.

Your client must support remote MCP and the document-transfer requirements of the tools you use. Examples below configure the connection; they are not a certification that every client can complete every file-upload or service journey.

### Any remote MCP client

Add a remote server named `Parking Mate UK`, enter `https://mcp.parkingmateuk.com/mcp`, then review the tools before enabling them. Do not paste server credentials, customer data or private keys into a configuration file.

### Claude Code

```sh
claude mcp add --transport http parking-mate-uk https://mcp.parkingmateuk.com/mcp
```

See [Claude Code's MCP documentation](https://code.claude.com/docs/en/mcp).

### Cursor

Add the server entry to `.cursor/mcp.json`, preserving any existing entries:

```json
{
  "mcpServers": {
    "parking-mate-uk": {
      "url": "https://mcp.parkingmateuk.com/mcp"
    }
  }
}
```

See [Cursor's MCP documentation](https://cursor.com/docs/mcp).

### VS Code

Add the server entry to `.vscode/mcp.json`, preserving any existing entries:

```json
{
  "servers": {
    "parking-mate-uk": {
      "type": "http",
      "url": "https://mcp.parkingmateuk.com/mcp"
    }
  }
}
```

See [VS Code's MCP documentation](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

## Available tools

This repository is the maintained technical reference for Parking Mate UK MCP tools and contracts. Keep contract requirements and integration updates here; the public platform page links to this guide rather than duplicating the tool catalogue.

Discovery checked on **15 September 2026**. Always read the server's current `tools/list` schemas before calling tools; this table is a guide, not a replacement schema.

| Tool | Purpose | Effect |
| --- | --- | --- |
| `get_quick_assessment_contract` | Get the lightweight private parking assessment requirements. | Read-only |
| `assess_parking_ticket_package` | Assess notice text, circumstances and optional evidence. | Read-only assessment; no case creation or submission |
| `get_parking_ticket_assessment_contract` | Get the complete question, confirmation and document requirements for a service. | Read-only |
| `submit_parking_ticket_assessment` | Send completed intake information and actual source documents; return assessment and payment link. | Creates or updates intake; not an operator appeal submission tool |
| `manage_existing_case` | Start the secure journey for updates or new correspondence. | Starts verification and case handling |
| `continue_existing_case` | Continue only the existing-case journey returned by the server. | Continues case handling |

## Suggested first requests

- "Assess this private parking notice. I have attached the notice and can explain what happened. Do not start a paid service yet."
- "Help me start the appropriate Parking Mate UK service for this notice. Tell me what information and documents are required first."
- "Help me check my existing Parking Mate UK appeal. Start the verification process."

## Documents and confirmations

Use the actual uploaded documents. Do not invent notice text, customer identity, file identifiers, download URLs, submission receipts or outcomes. Follow the contract returned by the server and obtain the customer's required confirmations before full intake. When a client cannot transfer the required documents, use [the online form](https://parkingmateuk.com/appeal-form) or [WhatsApp](https://wa.me/447983381237).

Do not retry a state-changing tool blindly after a timeout. Reconcile the returned session or case state first, so a retry does not create duplicate work. Keep case identifiers, notices, personal data, payment links and verification messages out of public GitHub issues.

## Check the connection

With Node.js 20 or newer:

```sh
node scripts/check-connection.mjs
```

This sends only MCP `initialize` and `tools/list` requests. It does not call assessment, intake or case-handling tools and does not submit a parking appeal.

## Support and privacy

For case support, use [WhatsApp](https://wa.me/447983381237) or [Parking Mate UK online](https://parkingmateuk.com/appeal-form), not a public issue. Read the [privacy notice](https://parkingmateuk.com/privacy-policy) and [service terms](https://parkingmateuk.com/terms).

Client setup references were checked on 15 September 2026. Client menus, plan access and supported file-transfer features can change independently of this MCP endpoint.
