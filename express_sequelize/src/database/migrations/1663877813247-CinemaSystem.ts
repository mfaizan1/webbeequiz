import {literal,  QueryInterface } from 'sequelize';
import { ModelAttributes } from 'sequelize/types/model';


export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
	


	    await queryInterface.createTable('users', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('movies', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: 'varchar' },
      duration: { type: 'integer' },
      release_date: {
        type: 'date',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);


	await queryInterface.createTable('shows', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      show_time: { type: 'time' },
      show_date: { type: 'date' },
      hall_number: {
        type: 'integer',
      },
	  is_booked_out: {type: 'boolean'},
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
	movieId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
    } as ModelAttributes);


    await queryInterface.createTable('cinemas', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'string' },
      address: { type: 'string' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      }
    } as ModelAttributes);

	await queryInterface.createTable('cinema_hall', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      hall_name: { type: 'string' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
	cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinemas',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
    } as ModelAttributes);

	await queryInterface.createTable('pricing', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      price: { type: 'double' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
	showId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'shows',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
	cinemaId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinemas',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
    } as ModelAttributes);


	await queryInterface.createTable('seat_types', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
       name: { type: 'string' },
	   premiumPercentage: { type: 'double' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);


	await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
	   isBooked: { type: 'boolean' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
	  	hallId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'cinema_hall',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
    } as ModelAttributes);

	await queryInterface.createTable('bookings', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
	showId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'shows',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
	  seat_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'seats',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },	
	user_id: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
    } as ModelAttributes);

  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
