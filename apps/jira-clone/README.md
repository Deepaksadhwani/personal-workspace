# Jira Clone

A full-stack Jira clone built with modern technologies.

## Technologies Used

- **Frontend**: Next.js with Tailwind CSS, ShadCN UI
- **State Management**: TanStack Query
- **API Routing**: Hono.js 

## Features

- User Authentication Implementation:
  - Login/Register forms with ShadCN UI components
  - TanStack Query mutations for API calls
  - QueryProvider setup for global query management
  - Backend API integration with auth endpoints:
    - POST /api/auth/login
    - POST /api/auth/register

## Getting Started

1. Clone the repository:  
   [https://github.com/Deepaksadhwani/personal-workspace.git](https://github.com/Deepaksadhwani/personal-workspace.git)

2. Navigate to the project directory and install dependencies:  
  
     **pnpm install** 
    
2. Navigate to the project directory and install dependencies:  
    
    **pnpm run dev --filter=jira-clone**