const {
  Booking,
  AccUser,
  Mentor,
  Position,
  Session,
  ScheduleTimeslot
} = require("../models");

exports.createBooking = async (userId, data) => {
  // 1️⃣ Resolve AccUser
  const accUser = await AccUser.findOne({
    where: { user_id: userId }
  });
  if (!accUser) throw new Error("Account not found");

  // 2️⃣ Fetch timeslot (lock availability)
  const slot = await ScheduleTimeslot.findOne({
    where: {
      id: data.schedule_timeslot_id,
      is_booked: false
    }
  });
  if (!slot) throw new Error("Timeslot unavailable");

  // 3️⃣ Fetch mentor, position, session
  const mentor = await Mentor.findByPk(data.mentor_id);
  const position = await Position.findByPk(data.position_id);
  const session = await Session.findByPk(data.session_id);

  if (!mentor || !position || !session) {
    throw new Error("Invalid booking data");
  }

  // 4️⃣ Create booking WITH SNAPSHOTS
  const booking = await Booking.create({
    schedule_timeslot_id: slot.id,
    mentor_id: mentor.id,
    acc_user_id: accUser.id,
    position_id: position.id,
    session_id: session.id,

    mentor_name_snapshot: `${mentor.first_name} ${mentor.last_name}`,
    acc_user_name_snapshot: `${accUser.first_name} ${accUser.last_name}`,
    position_name_snapshot: position.position_name,  // ✅ Fixed: use position_name instead of name
    session_price_snapshot: session.price,

    start_date_snapshot: slot.start_time,
    end_date_snapshot: slot.end_time,

    total_amount: session.price,
    status: "pending"
  });

  // 5️⃣ Delete the schedule automatically when booked (instead of marking as booked)
  await slot.destroy();

  return booking;
};
