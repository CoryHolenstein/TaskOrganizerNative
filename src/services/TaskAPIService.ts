// Mock API Service - Using local data instead of AWS
// TODO: Replace with actual API calls when AWS is configured

class TaskAPIService {
  async getTasks() {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        data: [],
      };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(task: any) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: {
          ...task,
          id: Date.now().toString(),
        },
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id: string, updates: any) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: {
          id,
          ...updates,
        },
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: { success: true },
      };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default new TaskAPIService();
