const getReminderLevel = ({ daysRemaining, reminderLevelSent }) => {
  // Stop if already completed or invalid
  if (daysRemaining === null) return null;

  // Reminder schedule
  if (daysRemaining <= 0 && reminderLevelSent < 1) return 1; // Gentle
  if (daysRemaining <= -3 && reminderLevelSent < 2) return 2; // Follow-up
  if (daysRemaining <= -7 && reminderLevelSent < 3) return 3; // Escalation

  return null;
};

module.exports = { getReminderLevel };
