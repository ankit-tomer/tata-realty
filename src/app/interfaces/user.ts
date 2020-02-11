export class Group {
    key: string;
    name: string;
    gender: string;
    uid: string;
    totalScore: number;
    createdAt: Date|null;
}

export class GroupMember {
    key: string;
    name: string;
    phone: string;
    isAdmin: boolean;
    uid: string;
    groupId: string;
}

export class User {
    key: string;
    fullName: string;
    email: string;
    phone: string;
    photo: string;
    gender: string;
    uid: string;
    createdAt: Date|null;
}
