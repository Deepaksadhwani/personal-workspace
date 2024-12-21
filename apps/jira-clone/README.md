# Jira Clone  

A full-stack Jira clone built with modern technologies.  

## Technologies Used  

- **Frontend**: Next.js with Tailwind CSS, Shadcn UI  
- **State Management**: TanStack Query  
- **API Routing**: Hono.js  
- **Backend Services**: Appwrite  

## Features  

- **Authentication System**:  
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


## Getting Started  

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

3. Set up Appwrite:  
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
