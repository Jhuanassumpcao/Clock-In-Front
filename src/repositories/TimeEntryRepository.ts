class TimeEntryRepository {
    saveShiftState(isActive: boolean): void {
      localStorage.setItem("shiftActive", JSON.stringify(isActive));
    }
  
    getShiftState(): boolean {
      return JSON.parse(localStorage.getItem("shiftActive") || "false");
    }
  }
  
  export default new TimeEntryRepository();
  