export class Game {
    key: string;
    uid: string;
    status: string;
    score: string;
    scoreSeconds: number;
    endedById: string;
    endedByName: string;
    createdAt: Date|null;
    lat: number;
    lon: number;
}

export class Player {
    key: string;
    gameId: string;
    name: string;
    uid: string;
    isAdmin: boolean;
    status: string;
    timestamp: string;
    gameUrl?: string|null;
}