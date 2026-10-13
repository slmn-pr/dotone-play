# DotOne Play — phase 1

A Persian RTL, responsive Next.js App Router demo for DotOne's reward-based gaming proposal.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 20.9+ (Node 22 LTS recommended).

## Phase 1 scope
- Reusable shell (Sidebar, Header, BottomNavigation), UI card components, responsive gaming lobby.
- Route placeholders for games, missions, rewards, wallet, ranking and profile.
- Entire economy, scores, streak, balance and missions are deliberately mock data. No real token, login or wallet service is connected.
- The playable mini-games and state handling are planned for phase 2 onward.

## Notes
- Google Fonts are fetched by next/font/google during build and require access to Google's font service. For fully offline builds, replace with a local licensed font.
- Some game buttons navigate to placeholder pages, not playable games at this stage.
