
# VectorShift Frontend Technical Assessment

## Assignment Overview

This repository contains the solution to the **VectorShift Frontend Technical Assessment**. The project consists of a frontend built using **React** and a backend implemented with **FastAPI**. The goal of this project is to create a flexible and reusable node abstraction, enhance the styling, improve the text node logic, and integrate the frontend with the backend for pipeline submission.

## Project Structure

- [Live URL](https://vector-shift-ijas.vercel.app/)
- [Backend GitHub Repository](https://github.com/Muhammedijas981/VectorShift_backend)

## 🚀 Getting Started

### Frontend Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammedijas981/VectorShift
   cd VectorShift
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Backend Setup

The backend repository is available at: https://github.com/Muhammedijas981/VectorShift_backend

1. **Clone the backend repository**
   ```bash
   git clone https://github.com/Muhammedijas981/VectorShift_backend.git
   cd VectorShift_backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```

4. **Backend will be available at**
   ```
   http://localhost:8000
   ```

## Part 1: Node Abstraction

A reusable and flexible node abstraction was created to simplify building new nodes. This abstraction allows you to easily add new nodes by defining the following:

- **Input Handles** and **Output Handles**
- Customizable fields (e.g., text inputs, dropdowns)
- Shared UI components across different node types

### New Nodes Created:
- Checkbox Node
- Color Picker Node
- Input Node
- String Concatenate Node
- Multiplier Node

## Part 2: Styling

Styling was applied using **TailwindCSS** and **NextUI** to create a modern and clean interface. The design prioritizes usability, with proper visual cues for node connections and interactive components.

### Features:
- Drag-and-drop pipeline builder
- Interactive components with smooth transitions and hover effects

## Part 3: Text Node Logic

The **Text Node** was improved with the following functionality:

1. **Dynamic Resizing**: The node adjusts its width and height based on the text input to improve visibility.
2. **Variable Detection**: Users can define variables inside double curly braces (`{{ variable }}`). The node automatically generates input handles for these variables, allowing them to interact with other nodes.

## Part 4: Backend Integration

The frontend is integrated with the **FastAPI** backend. When a pipeline is submitted, the frontend sends the nodes and edges to the backend. The backend performs the following:

- Calculates the number of nodes and edges.
- Checks if the pipeline forms a **Directed Acyclic Graph (DAG)** using **NetworkX**.
- Returns a result to the frontend, which displays it via a toast notification.

## 🔧 API Integration

### Pipeline Analysis Endpoint

**Endpoint**: `POST /pipelines/parse`

**Request Format**:
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response Format**:
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "status": "parsed"
}
```

The frontend automatically sends pipeline data to this endpoint when the submit button is clicked, and displays the analysis results in a user-friendly alert.

