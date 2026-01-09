import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

interface SettingsCreationAttr {
    user_id: number;
    theme?: string;
    language?: string;
}

@Table({ tableName: 'settings' })
export class Settings extends Model<Settings, SettingsCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'light',
    })
    declare theme: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'en',
    })
    declare language: string;

    @BelongsTo(() => User)
    declare user: User;
}
