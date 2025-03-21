# Café Management System

A modern web application for managing café information, built with React and .NET Core. This system allows users to create, read, update, and delete café information through a user-friendly interface.

## Features

- **Café Management**
  - View list of cafés
  - Add new café entries
  - Edit existing café information
  - Delete café entries
  - Validation for café data

## Tech Stack

### Frontend

- React 18
- TypeScript
- Material-UI (MUI)
- Formik & Yup for form handling
- Axios for API communication

### Backend

- .NET Core 7.0
- Entity Framework Core
- MediatR for CQRS pattern
- SQL Server

## Prerequisites

- .NET Core SDK 7.0
- SQL Server
- Visual Studio 2022 or VS Code

## Getting Started


The API will be available at `[https://localhost:44357/index.html]`
### BackEnd Results
Swagger View End Points .

![image](https://github.com/user-attachments/assets/354fe223-f31a-433d-be98-58fb26fdb656)


### Frontend Setup
Proof of UI Visibility
Employee application will be available at (http://localhost:5173/employees)
Employee DashBaord
![image](https://github.com/user-attachments/assets/0df0069c-7d84-4d11-86c3-9b5a71ea8afe)

Add New Employee
![image](https://github.com/user-attachments/assets/5ef399e5-90c1-4870-a9d4-4c3162aebdc6)

Delete Employee 
![image](https://github.com/user-attachments/assets/6c995350-fbc1-47b0-80d2-86834ca72134)

Cafe application will be available at ([http://localhost:5173/cafes])
Cafe Dashboard
![image](https://github.com/user-attachments/assets/4e6f6ed6-32da-4f29-94fa-e7cd2d03fb1c)
Edit Cafe :
![image](https://github.com/user-attachments/assets/64df11aa-ce75-4825-8f1f-02a39d472284)
Delete Cafe:
![image](https://github.com/user-attachments/assets/d83cf286-a3ea-4c3b-81cd-5706a0bff62b)
Add New Cafe :
![image](https://github.com/user-attachments/assets/4cb6376d-98a7-43f1-9964-f400d7a8441c)


## Project Structure

```
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Data/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── pages/
│   └── public/
```

## API Endpoints

### Cafés

- `GET /api/cafe` - Get all cafés
- `GET /api/cafe?id={id}` - Get café by ID
- `PUT /api/cafe?id={id}` - Update café
- `POST /api/cafe` - Create new café
- `DELETE /api/cafe?id={id}` - Delete café

## Data Models



## Contributing
NA

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
