# Pop and DarkPop visual system

Both palettes use the same primitives in [`src/pop-themes.css`](../src/pop-themes.css), loaded after the base layout stylesheet. Palette values remain in `src/model.ts`. Light, Dark and imported themes are outside this override scope.

## Shared rules

- Keys use one contour, a subdued inner ring and a hard downward shadow. Primary actions use the pink accent with dark text; secondary actions use the surface fill.
- Hover changes the fill and contour without shifting controls. Pressing a key moves it down two pixels and reduces its shadow. Disabled controls retain their shape with reduced opacity.
- Selected controls use one accent-tinted surface. Keyboard focus uses a separate, visible outline.
- Cards use a larger radius and shadow than compact keys. Fields remain flat writing surfaces.
- A sidebar section is one compound key: its chevron and title share the surface; its plus action is independent.
- Mint accents are limited to small heading marks, World icons and writing tips. Manuscript text retains its writing font and neutral foreground.
- Theme changes must preserve spacing between parent controls and nested actions. Do not add a second border or shadow to an inner label.

## Browser checks

Run `npm run test:themes` with Chromium installed; `CHROMIUM_BIN` can select its executable. The runner starts Vite on port 5191 and a temporary Chromium profile with CDP on port 9231. Both ports must be free.

The check visits library, project creation, Grimoire, synopsis editing, expanded navigation, search, preferences, export, sync setup, licenses, chapters, World, character list, character creation/editing, role options, notes, chapter editor, full chapter, scene description, history, consistency, progress, scrolling and focus. It also captures hover and pressed states.

Both themes are checked at 1440×1000 and 390×844. Assertions cover page overflow, React failures, mobile icon centers, primary action color, pressed depth and Escape in the role menu. Screenshots and a JSON report are written to a temporary directory printed by the runner; set `THEME_SCREENSHOTS` to choose another directory. Generated images are for visual review and are not committed as golden snapshots.

This suite supports visual review in Chromium. It does not replace checks in other browser engines or on physical devices.
