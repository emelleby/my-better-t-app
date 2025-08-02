# Auth Flow Test

## Expected Behavior

1. **Home Page (Unauthenticated)**:
   - Shows ASCII art title
   - Shows API status section
   - Shows auth demo with "Sign In (Mock)" button
   - User is NOT redirected

2. **After Clicking "Sign In (Mock)"**:
   - User should be automatically redirected to `/dashboard`
   - Should see dashboard layout with sidebar
   - Should see dashboard content with metrics cards

3. **Dashboard Access (Authenticated)**:
   - User can navigate between dashboard pages
   - Breadcrumbs work correctly
   - Sidebar navigation works

4. **Sign Out**:
   - Click user avatar in sidebar → "Log out"
   - Should be redirected back to home page
   - Should see auth demo again with "Sign In" button

5. **Direct Dashboard Access (Unauthenticated)**:
   - If user tries to access `/dashboard` directly while not authenticated
   - Should be redirected to home page

## Implementation Details

- Home page (`/`) checks auth state and redirects authenticated users to `/dashboard`
- Dashboard layout checks auth state and redirects unauthenticated users to `/`
- Auth state persists across page refreshes via localStorage
- Sign-out from sidebar redirects to home page