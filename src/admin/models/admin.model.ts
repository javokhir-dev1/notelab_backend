import { Column, Model, Table, DataType, HasMany, AllowNull } from 'sequelize-typescript';

interface AdminCreationAttr {
    username: string,
    password: string,
    avatar_url?: string,
    bio?: string,
    is_creator: boolean
    refresh_token: string
}


@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare username: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.STRING,
    })
    declare avatar_url: string

    @Column({
        type: DataType.STRING,
    })
    declare bio: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare is_creator: boolean

    @Column({
        type: DataType.STRING
    })
    declare refresh_token: string
}