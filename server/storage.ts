// Базовый интерфейс для хранилища данных
interface User {
  id: string;
  username: string;
  // Добавьте другие поля по необходимости
}

interface GameState {
  id: string;
  userId: string;
  state: any;
  // Добавьте другие поля по необходимости
}

// Простое хранилище в памяти для демонстрационных целей
class Storage {
  private users: User[] = [];
  private gameStates: GameState[] = [];

  // Методы для работы с пользователями
  async insertUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  // Методы для работы с состоянием игры
  async saveGameState(gameState: GameState): Promise<GameState> {
    const existingIndex = this.gameStates.findIndex(gs => gs.id === gameState.id);
    
    if (existingIndex >= 0) {
      this.gameStates[existingIndex] = gameState;
    } else {
      this.gameStates.push(gameState);
    }
    
    return gameState;
  }

  async getGameStateByUserId(userId: string): Promise<GameState | undefined> {
    return this.gameStates.find(gs => gs.userId === userId);
  }
}

// Экспортируем экземпляр хранилища
export const storage = new Storage();
