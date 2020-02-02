export class Game {
    key: string;
    uid: string;
    status: string;
    score: number;
}

export class Player {
    key: string;
    gameId: string;
    name: string;
    uid: string;
    isAdmin: boolean;
    status: string
    timestamp: string
}