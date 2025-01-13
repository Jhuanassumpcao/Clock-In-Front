import apiClient from "../api/axiosConfig";
import { TimeEntry } from "../interfaces/TimeEntry";

class TimeEntryService {
  async startShift(userId: number, startTime: Date): Promise<void> {
    await apiClient.post("/time-entries/start", { userId, startTime });
  }

  async endShift(id: number, endTime: Date): Promise<void> {
    await apiClient.post("/time-entries/end", { id, endTime });
  }
  async getHistory(): Promise<TimeEntry[]> {
    const response = await apiClient.get<TimeEntry[]>(`/time-entries/list`);
    return response.data;
  }
}

export default new TimeEntryService();
