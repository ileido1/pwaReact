// interfaces.ts
export interface TaskType {
    id: number;
    text: string;
  }
  
 export interface RemoveTaskFunction {
    (): void;
  }