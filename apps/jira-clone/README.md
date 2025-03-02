# Jira Clone

A full-stack Jira clone built with modern technologies.

## Technologies Used

- **Frontend**: Next.js with Tailwind CSS, Shadcn UI
- **State Management**: TanStack Query, Nuqs
- **API Routing**: Hono.js
- **Backend Services**: Appwrite


## 🛠️ Tech Stack


- **Frontend**: Next.js with Tailwind CSS, Shadcn UI
- **State Management**: TanStack Query, Nuqs
- **API Routing**: Hono.js
- **Backend Services**: Appwrite

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deepaksadhwani/personal-workspace.git
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Navigate to the Jira Clone application:

   ```bash
   cd apps/jira-clone
   ```

4. Set up Appwrite:
   - Create an Appwrite project
   - Configure environment variables

## Development

1. **Development Server Configuration**:

   - The server is pre-configured to run on **port 7000**.

2. **Starting the Development Server**:

   - Use the following command to start the project:
     ```bash
     pnpm run dev
     ```

3. **Access the Application**:
   - Once the server is running, open your browser and navigate to:  
     [http://localhost:7000](http://localhost:7000).


## Features

- **Authentication System**:

  - **OAuth Integration**:
    - **Supported Providers**:
      - Google OAuth
      - GitHub OAuth
    
    - **Implementation Details**:
      - Configured through Appwrite Dashboard
      - Secure callback URL handling
      - Automatic user profile creation
      - Profile picture sync from OAuth providers
    
    - **Client-Side Features**:
      - OAuth login buttons with provider icons
      - Loading states during authentication
      - Automatic redirect handling
      - Error handling for failed OAuth attempts
    
    - **Setup Steps**:
      1. Configure OAuth providers in Appwrite Console:
         - Add authorized domains
         - Set up OAuth client IDs and secrets
         - Configure callback URLs
      2. Enable OAuth methods in project settings
      3. Implement OAuth buttons in login UI
      4. Handle OAuth callbacks in application

  - **Client-Side Features**:

    - Protected routes with automatic redirection
    - Complete authentication UI:
      - Sign In card with email/password login
      - Sign Up card with name, email, password registration
      - User avatar button with dropdown menu
      - Social login placeholders (Google, GitHub)
    - Custom hooks for authentication:
      - `useCurrent()` - Fetch current user status
      - `useLogin()` - Handle user login
      - `useLogout()` - Handle user logout
      - `useRegister()` - Handle user registration
    - Form validation using Zod schemas
    - TanStack Query integration for state management
    - Automatic query invalidation on auth state changes
    - Responsive design with mobile support
    - Toast notifications for:
      - Successful login/registration
      - Authentication errors
      - Session expiration alerts

  - **Server-Side Features**:

    - Secure session management with HTTP-only cookies
    - Session middleware for protected routes
    - Type-safe request validation using Hono
    - Endpoints:
      - `GET /api/auth/current` - Get current user
      - `POST /api/auth/login` - User login
      - `POST /api/auth/register` - User registration
      - `POST /api/auth/logout` - User logout

  - **Security Features**:
    - HTTP-only cookies for session storage
    - Secure cookie settings with strict same-site policy
    - 30-day session duration
    - Type-safe API implementations

- **Dashboard Layout Implementation**:

  - **Components Structure**:
    - Responsive Navigation System:
      - Desktop sidebar with permanent display
      - Mobile-friendly collapsible sidebar
      - Dynamic navigation links with active states
    - Main Layout Components:
      - `Navbar` - Top navigation with user controls
      - `Sidebar` - Main navigation menu
      - `MobileSidebar` - Responsive drawer for mobile view
      - `Navigation` - Reusable navigation links component
  - **Current Features**:
    - Responsive design with mobile-first approach
    - Sheet component for mobile navigation
    - Auto-closing mobile menu on route changes
    - SVG icons integration using Lucide React

- **Workspace Management**:

  - **Client-Side Features**:
    - Create workspaces with name and custom icon
    - Image preview and upload functionality
    - Form validation using Zod schemas
    - Responsive modal system (desktop/mobile support)
    - Real-time image preview
    - Custom file input with avatar fallback
    - URL-based modal state management using nuqs
    - Workspace switcher component with:
      - List of available workspaces
      - Custom workspace avatars
      - Add workspace button
      - Dropdown selection interface
  - **Components**:
    - `WorkspaceAvatar`: Displays workspace image or fallback initial
    - `WorkspaceSwitcher`: Handles workspace selection and navigation
    - `ResponsiveModal`: Adaptive modal that switches between dialog and drawer
    - `CreateWorkspaceModal`: Modal for workspace creation
  - **Hooks**:
    - `useCreateWorkspaceModal`: Manages modal state via URL parameters
    - `useWorkspaceId`: Manages current workspace selection
    - `useGetWorkSpaces`: Fetches workspace data
  - **State Management**:
    - URL-based state management for modals using nuqs
    - Query invalidation on workspace changes
    - Automatic workspace routing
  - **Server Queries**:
    - Secure workspace fetching with session validation
    - Member-workspace relationship queries
    - Automatic workspace redirection logic

  - **Server-Side Features**:
    - Secure workspace creation endpoint
    - Image processing and storage
    - Type-safe request validation
    - Protected routes with session middleware
    - Workspace API Routes:
      - `GET /api/workspaces` - Fetch user's workspaces based on membership
      - `POST /api/workspaces` - Create new workspace with member role
    - Member Management:
      - Automatic admin role assignment for workspace creator
      - Member-workspace relationship tracking
      - Workspace access control based on membership
    - Appwrite integration for:
      - Database document creation
      - File storage and retrieval
      - Base64 image conversion
      - Member role management
      - Filtered workspace queries by membership
      - Workspace ordering by creation date

  - **New Features**:
    - Create workspaces through a dedicated page route
    - Standalone layout with navigation header
    - Protected routes with authentication checks
    - Workspace detail pages with dynamic routing
    - User button integration in header
    - Logo and branding elements
  
  - **Updated Components**:
    - Enhanced workspace creation form with:
      - Image upload preview
      - Workspace name validation
      - Responsive layout
      - Loading states
      - Cancel/Submit actions
    - New standalone layout component
    - Workspace detail page structure

  - **Workspace Editing Features**:
    - Edit existing workspaces with name and icon updates
    - Real-time image preview and removal
    - Secure route protection for workspace editing
    - Components:
      - `EditWorkspaceForm`: Standalone form for workspace editing
      - Enhanced image handling with preview and remove options
    - API Integration:
      - `PATCH /api/workspaces/:workspaceId` endpoint
      - Role-based access control (Admin only)
      - Automatic query invalidation on updates
    - UX Features:
      - Back navigation with route history
      - Loading states during updates
      - Success/Error notifications
      - Image validation and preview
      - Responsive layout adaptation
    - Delete workspace functionality with:
      - Confirmation dialog before deletion
      - Role-based access control (Admin only)
      - Automatic cleanup of workspace data
      - Redirection after successful deletion
    - Common Components:
      - `useConfirm` hook for reusable confirmation dialogs
      - Responsive confirmation UI (desktop/mobile)
      - Customizable dialog content and button variants
    - UX Features:
      - Danger zone section for destructive actions
      - Clear warning messages
      - Loading states during deletion
      - Success/Error notifications

### Workspace Management

- **Core Features**:
  - Create, edit, and delete workspaces
  - Workspace settings management
  - Member role management
  - Invite code system
  - Image upload and preview

- **API Integration**:
  - **Workspace Queries**:
    - `useGetWorkSpaces()`: List all user workspaces
    - `useGetWorkspace()`: Get single workspace details
    - `useGetWorkspaceInfo()`: Get workspace summary info
  
  - **Server Endpoints**:
    - `GET /api/workspaces`: List workspaces
    - `GET /api/workspaces/:id`: Get workspace details
    - `GET /api/workspaces/:id/info`: Get workspace info
    - `POST /api/workspaces`: Create workspace
    - `PATCH /api/workspaces/:id`: Update workspace
    - `DELETE /api/workspaces/:id`: Delete workspace
    - `POST /api/workspaces/:id/reset-invite-code`: Reset invite code
    - `POST /api/workspaces/:id/join`: Join workspace with invite code

### Workspace Analytics

- **Analytics Dashboard**:
  - Task statistics overview with:
    - Total task count with monthly comparison
    - Assigned tasks metrics
    - Completed tasks tracking
    - Incomplete tasks monitoring
    - Overdue tasks analysis
  - Real-time updates via TanStack Query
  - Month-to-month comparison metrics
  - Visual trend indicators

- **Implementation Details**:
  - Custom hooks for analytics:
    - `useGetWorkspaceAnalytics` - Fetch workspace analytics data
  - API Integration:
    - `GET /api/workspaces/:workspaceId/analytics` endpoint
    - Type-safe response handling
    - Date-based filtering for monthly comparisons
  - Components:
    - Analytics dashboard with responsive layout
    - Task metrics cards with trend indicators
    - Projects and members overview
    - Quick action buttons for task/project creation

- **Dashboard Features**:
  - Task list with:
    - Task name and project context
    - Due date indicators
    - Quick navigation to task details
  - Project grid showing:
    - Project avatars and names
    - Quick access to project pages
  - Member overview with:
    - Member avatars and names
    - Role indicators
    - Quick access to member settings

## Projects Management Features

### Project Creation
- Create new projects within workspaces
- Upload and preview project images
- Form validation with Zod schemas
- Real-time image preview functionality
- Automatic project listing updates

### Project Listing
- View all projects within a workspace
- Projects sorted by creation date
- Secure access control based on workspace membership
- Real-time updates using TanStack Query

### Project Components
- `CreateProjectModal`: Responsive modal for project creation
- `CreateProjectForm`: Form component with:
  - Project name input
  - Image upload with preview
  - Real-time validation
  - Loading states
  - Cancel/Submit actions

### Project Architecture
- **Route Handling**:
  - Protected routes with session middleware
  - Type-safe request validation using Zod
  - Project data management with Appwrite

- **Client Components**:
  - Modal state management using URL parameters
  - Form validation with Zod schemas
  - Image preview and upload functionality
  - Responsive UI adapting to desktop/mobile views

- **API Integration**:
  - TanStack Query for state management
  - Automatic query invalidation
  - Type-safe API implementations
  - Real-time updates for project listing

### Technical Implementation
- **Client-Side**:
  - Custom hooks for project management:
    - `useCreateProject` - Handle project creation
    - `useGetProjects` - Fetch workspace projects
  - Automatic query invalidation on changes
  - Toast notifications for success/error states
  
- **Server-Side**:
  - Secure project creation endpoint
  - Image processing and storage using Appwrite
  - Protected routes with session middleware
  - Project API Routes:
    - `GET /api/projects` - Fetch workspace projects
    - `POST /api/projects` - Create new project

### Project Detail Page
- View detailed project information
- Project header with name and avatar
- Quick access to project settings
- Protected routes with authentication
- Components:
  - `ProjectAvatar`: Displays project image or fallback
  - Edit button for quick navigation to settings

### Project Settings Features
- **Project Editing**:
  - Edit project name and image
  - Protected routes with member authorization
  - Form validation with Zod schemas
  - Success/Error notifications
  - Back navigation to project view

- **Project Deletion**:
  - Secure deletion with member authorization
  - Success/Error notifications
  - Automatic redirection after deletion
  - Query cache invalidation

- **API Integration**:
  - New endpoints:
    - `PATCH /api/projects/:projectId` - Update project
    - `DELETE /api/projects/:projectId` - Delete project
  - Member-based access control
  - Image processing for uploads
  - Automatic query invalidation

### Project Analytics
- **Core Features**:
  - Monthly task analytics dashboard
  - Comparison with previous month's metrics
  - Real-time data updates
  - Responsive scrollable interface

- **Analytics Metrics**:
  - Total tasks count and trend
  - Assigned tasks statistics
  - Completed tasks tracking
  - Overdue tasks monitoring
  - Incomplete tasks analysis

- **Components**:
  - `Analytics`: Main analytics dashboard with:
    - Horizontal scrollable interface
    - Responsive card layout
    - Visual trend indicators
  - `AnalyticsCard`: Metric display card with:
    - Title and value presentation
    - Trend direction indicators (up/down)
    - Color-coded status indicators
    - Comparative difference display

- **API Integration**:
  - **Analytics Queries**:
    - `useGetProjectAnalytics()`: Fetch project analytics data
    - Type-safe response handling with Hono types
  
  - **Server Endpoints**:
    - `GET /api/projects/:projectId/analytics`: Get project analytics with:
      - Current month metrics
      - Previous month comparison
      - Task status breakdowns
      - Performance trends

### Error & Loading States
  - Full-screen loading indicator with:
    - Animated spinner using Lucide icons
    - Clean centered layout
    - Subtle animation effects
    - Consistent branding colors

- **Error Handling System**:
  - Features:
    - User-friendly error presentation
    - Navigation options to recover:
      - "Back to home" action
      - Clear error indicators
    - Visual feedback with warning icons
    - Error boundary catches:
      - Runtime errors
      - Network failures
      - Authentication issues
      - Server-side errors

## Member Management Features

### Member List
- View all workspace members with their names, emails, and avatars
- Clean interface with member cards separated by dividers
- Back navigation to workspace view

### Member Role Management
- Administrators can modify member roles
- Available roles:
  - Administrator
  - Member
- Role changes are restricted to prevent removing the last administrator

### Member Removal
- Administrators can remove members from workspaces
- Confirmation dialog before member removal
- Safety check to prevent removing the last workspace member

## Task Management Features

### Task Filtering
The application supports comprehensive task filtering with the following options:
- Status filtering (Backlog, In Progress, In Review, Todo, Done)
- Assignee filtering
- Project filtering
- Due date filtering
- Search functionality

### Task Views
Tasks can be viewed in multiple formats:
- Table View
- Kanban Board
- Calendar View

### Key Components
- `useTaskFilters`: Custom hook for managing task filter states
- `TaskViewSwitcher`: Component for switching between different task views
- `DataFilters`: Component providing filter controls for tasks

### Task Views and Interface
- **Table View Implementation**:
  - Sortable columns
  - Pagination controls
  - Text-based filtering
  - Responsive table layout
  - Custom cell renderers for different data types

- **Kanban View Implementation**:
  - Advanced drag and drop interface using @hello-pangea/dnd
  - Column-based status organization:
    - Backlog
    - Todo
    - In Progress
    - In Review
    - Done
  - Features:
    - Real-time task position updates
    - Automatic position calculation
    - Drag between columns (status change)
    - Drag within columns (reordering)
    - Position constraints (1000-1,000,000)
    - Optimistic UI updates
    - Batch updates for efficiency
  - Visual elements:
    - Task count per column
    - Task cards with:
      - Title with ellipsis
      - Assignee avatar
      - Due date indicator
      - Project information
      - Action menu
    - Column headers with status and count
    - Smooth drag animations
  - Mobile responsive:
    - Horizontal scrolling
    - Touch-friendly interactions
    - Compact card layout

- **Calendar View Implementation**:
  - Interactive month-based calendar using react-big-calendar
  - Custom Components:
    - `EventCard`: Dedicated component for task display showing:
      - Task title
      - Assignee avatar
      - Project icon
      - Status-based color indicators
    - `CustomToolbar`: Enhanced navigation with:
      - Previous/Next month controls
      - Today button
      - Current month/year display
  - Features:
    - Custom event rendering with card-based layout
    - Status-based color coding for tasks
    - Click-through navigation to task details
    - Custom styling with CSS modules
    - Task grouping by date
    - Responsive calendar grid
  - UX Improvements:
    - Clean date header formatting
    - Consistent spacing and layout
    - Mobile-friendly view
    - Interactive event cards
    - Visual hierarchy with status colors

- **Task Date Display**:
  - Color-coded due dates based on urgency:
    - Red: 3 days or less
    - Orange: Less than 7 days
    - Yellow: 14 days or less
    - Default color for longer periods

- **Task Actions**:
  - Dropdown menu for task operations
  - Available actions:
    - View task details
    - Open associated project
    - Edit task
    - Delete task
  - Permission-based action availability

### Components Structure
- **Core Components**:
  - `TaskViewSwitcher`: Main view controller with tabs
  - `DataTable`: Reusable table component with sorting and filtering
  - `TaskDate`: Date display with status colors
  - `TaskActions`: Action menu for task operations

### View Features
- Tab-based view switching Table
- Loading states with spinner animation
- Quick task creation button
- Comprehensive filtering system
- Responsive layout adaptations

### Task Details Features
- **Task Overview**:
  - Task title and project context
  - Task description with inline editing
  - Task status and due date display
  - Assignee information
  - Delete task functionality with confirmation

- **Task Components**:
  - `TaskOverview`: Displays task metadata with:
    - Assignee information
    - Due date with status colors
    - Current status badge
    - Quick edit button
  - `TaskDescription`: Rich text description with:
    - Inline editing capability
    - Save/cancel actions
    - Loading states
  - `TaskBreadcrumbs`: Navigation context showing:
    - Project link with avatar
    - Task name
    - Delete task button
  
- **Implementation Details**:
  - Protected routes with task ID validation
  - Real-time updates using TanStack Query
  - Responsive layout for mobile/desktop
  - Optimistic updates for description changes
  - Delete confirmation dialog
  - Navigation back to task list after deletion

## Implementation Details

### Filter States
Task filters are managed using URL query parameters, allowing for:
- Shareable filtered views
- Persistent filter state across page reloads
- Clean URL-based state management

### Task Views
- Multiple view options:
  - Table view for list-based task management
  - Kanban view for drag-and-drop workflow
  - Calendar view for timeline-based planning
- Responsive view switcher with mobile support
- Create new tasks from any view

### Task API Features
- **Endpoints**:
  - `GET /api/tasks` - Fetch tasks with filtering options:
    - Workspace filtering
    - Project filtering
    - Assignee filtering
    - Status filtering
    - Due date filtering
    - Search by task name
  - `POST /api/tasks` - Create new tasks with:
    - Name and description
    - Status assignment
    - Project association
    - Assignee selection
    - Due date setting
    - Automatic position calculation for ordering
  - `DELETE /api/tasks/:taskId` - Delete task
  - `PATCH /api/tasks/:taskId` - Update task
  - `GET /api/tasks/:taskId` - Get single task

### Task Components
- `TaskViewSwitcher`: Manages view transitions with:
  - Tab-based navigation
  - Quick task creation button
  - Filter section
  - View-specific content areas

### Task Creation
- Create new tasks with:
  - Title and description
  - Due date selection with date picker
  - Project association
  - Status assignment
  - Workspace context awareness

### Task API Integration
- **Client-Side Hooks**:
  - `useCreateTask` - Handles task creation with mutations
  - `useGetTasks` - Fetches tasks with filtering
  - `useCreateTaskModal` - Manages task creation modal state
  - `useUpdateTasks` - Handle task updates
  - `useDeleteTasks` - Handle task deletion
  - `useGetTask` - Fetch single task data

- **Components**:
  - `CreateTaskModal` - Responsive modal for task creation
  - `CreateTaskFormWrapper` - Form handling component
  - `UpdateTaskModal` - Responsive modal for task updation
  - `UpdateTaskFormWrapper` - Form handling component
  - `DatePicker` - Custom date selection component

- **State Management**:
  - URL-based modal state using nuqs
  - TanStack Query for data fetching
  - Automatic query invalidation on changes
  - Toast notifications for success/error states

