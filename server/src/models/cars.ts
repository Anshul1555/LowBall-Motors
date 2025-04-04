import {DataTypes, Model, Sequelize, Optional} from 'sequelize';



interface CarAttributes {
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    }

interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}

export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public id!: number;
    public brand!: string;
    public model!: string;
    public year!: number;
    public price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initCarsModel(sequelize: Sequelize) {
    Car.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'cars',
        sequelize,
    });
    return Car;
}

