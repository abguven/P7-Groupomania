export class PostWithUserInfo{
    uuid!: string;
    likes!: number;
    title!:string;
    content!: string;
    post_image_url!: string;
    user_uuid!: string;
    updatedAt!: Date;
    createdAt!: Date;
    user!: { user_name: string, last_name: string, avatar_url: string };
    PostLikes!: { UserUuid: string }[];
    usersLiked!: string[];
}