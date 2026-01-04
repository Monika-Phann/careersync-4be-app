module.exports = (sequelize, DataTypes) => {
  const ScheduleTimeslot = sequelize.define(
    "ScheduleTimeslot",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },

      mentor_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      session_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },

      end_time: {
        type: DataTypes.DATE,
        allowNull: false
      },

      is_booked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      booking_id: {
        type: DataTypes.UUID,
        allowNull: true  // Optional - will be set when booking is created
      }
    },
    {
      tableName: "Schedule_Timeslot", // 🔥 THIS IS THE KEY FIX
      timestamps: true,
      underscored: true
    }
  );

  ScheduleTimeslot.associate = (models) => {
    ScheduleTimeslot.belongsTo(models.Mentor, {
      foreignKey: "mentor_id"
    });

    ScheduleTimeslot.belongsTo(models.Session, {
      foreignKey: "session_id",
      onDelete: "CASCADE"
    });

    ScheduleTimeslot.belongsTo(models.Booking, {
      foreignKey: "booking_id",
      constraints: false  // Don't create FK constraint during sync (handles circular dependency)
    });
  };

  return ScheduleTimeslot;
};
