# Jira Clone  

A full-stack Jira clone built with modern technologies.  

## Technologies Used  

- **Frontend**: Next.js with Tailwind CSS, Shadcn UI  
- **State Management**: TanStack Query  
- **API Routing**: Hono.js  
- **Backend Services**: Appwrite  

## Features  

- **User Authentication Implementation**:  
  - Login/Register forms with Shadcn UI components  
  - TanStack Query mutations for API calls  
  - QueryProvider setup for global query management  
  - Appwrite Integration:  
    - Email/Password authentication  
    - Session management with secure cookies  
    - User creation and login functionality  
  - Backend API integration with auth endpoints:  
    - `POST /api/auth/login` - Authenticates users via Appwrite  
    - `POST /api/auth/register` - Creates new users in Appwrite  
    - `POST /api/auth/logout` - Handles user session termination  

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
