import { useState, useEffect } from 'react';

const AdvancedInterviewCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem('reminders');
        return saved ? JSON.parse(saved) : {};
    });
    const [selectedKey, setSelectedKey] = useState('');
    const [modalData, setModalData] = useState({
        time: '',
        note: '',
        category: 'Technical'
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

    const categoryColors = {
        Technical: 'bg-blue-100 text-blue-800',
        HR: 'bg-green-100 text-green-800',
        'Follow-up': 'bg-yellow-100 text-yellow-800',
    };

    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]);

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let day = 1;
        let calendarDays = [];

        // Add day headers
        days.forEach((day, index) => {
            calendarDays.push(
                <div key={`header-${index}`} className="font-bold text-indigo-500">
                    {day}
                </div>
            );
        });

        // Add calendar days
        for (let i = 0; i < 42; i++) {
            if (i < firstDay || day > lastDate) {
                calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
            } else {
                const dateKey = `${year}-${month + 1}-${day}`;
                const isToday = today.toDateString() === new Date(year, month, day).toDateString();
                const dayReminders = reminders[dateKey] || [];

                const tags = dayReminders.map((r, index) => (
                    <span
                        key={`tag-${dateKey}-${index}`}
                        className={`text-[10px] mt-1 ${categoryColors[r.category] || ''} px-1 rounded`}
                    >
                        {r.category}
                    </span>
                ));

                calendarDays.push(
                    <div key={`day-${day}`}>
                        <button
                            onClick={() => openModal(dateKey)}
                            className={`w-full h-10 flex flex-col justify-center items-center rounded hover:bg-indigo-100 text-xs ${isToday ? 'border border-indigo-500' : ''
                                }`}
                        >
                            {day}
                            {tags}
                        </button>
                    </div>
                );
                day++;
            }
        }

        return calendarDays;
    };

    const openModal = (key) => {
        setSelectedKey(key);
        setModalData({
            time: '',
            note: '',
            category: 'Technical'
        });
        setIsDeleteVisible(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {

        console.log(modalData);
        console.log('e target', e.target);

        const { id, value } = e.target;
        console.log(id);
        console.log(value);
        setModalData(prev => ({
            ...prev,
            [id]: value
        }));

        console.log('After set', modalData)
    };

    const keyMap = {
        reminderTime: 'time',
        reminderNote: 'note',
        reminderCategory: 'category'
    };
    useEffect(() => {
        console.log("Modal data updated:", modalData);
    }, [modalData]);


    // const handleInputChange = (e) => {
    //     const { id, value } = e.target;
    //     const key = keyMap[id];

    //     if (!key) return;

    //     setModalData(prev => ({
    //         ...prev,
    //         [key]: value
    //     }));
    // };

    const saveReminder = () => {
        const { time, note, category } = modalData;
        if (!time || !note) {
            alert("Fill in all fields");
            return;
        }

        const [y, m, d] = selectedKey.split('-');
        const futureTime = new Date(y, m - 1, d, ...time.split(':'));
        if (futureTime <= new Date()) {
            alert("Time must be in future");
            return;
        }

        const reminder = { time, note, category };
        setReminders(prev => ({
            ...prev,
            [selectedKey]: [...(prev[selectedKey] || []), reminder]
        }));

        closeModal();
    };

    const deleteReminder = () => {
        const { time, note, category } = modalData;
        const dayReminders = [...reminders[selectedKey]];
        const rIndex = dayReminders.findIndex(r =>
            r.time === time && r.note === note && r.category === category
        );

        if (rIndex !== -1) {
            dayReminders.splice(rIndex, 1);
            const updatedReminders = { ...reminders };
            if (dayReminders.length === 0) {
                delete updatedReminders[selectedKey];
            } else {
                updatedReminders[selectedKey] = dayReminders;
            }
            setReminders(updatedReminders);
        }

        closeModal();
    };

    const updateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + (direction === 'prev' ? -1 : 1));
        setCurrentDate(newDate);
    };

    const deleteReminderFromSidebar = (date, time) => {
        const dateKey = Object.keys(reminders).find(k =>
            new Date(k).toDateString() === date
        );

        if (dateKey) {
            const dayReminders = [...reminders[dateKey]];
            const rIndex = dayReminders.findIndex(r => r.time === time);

            if (rIndex !== -1) {
                dayReminders.splice(rIndex, 1);
                const updatedReminders = { ...reminders };
                if (dayReminders.length === 0) {
                    delete updatedReminders[dateKey];
                } else {
                    updatedReminders[dateKey] = dayReminders;
                }
                setReminders(updatedReminders);
            }
        }
    };

    const updateSidebar = () => {
        const items = Object.keys(reminders)
            .map(k => {
                const [y, m, d] = k.split('-');
                const date = new Date(y, m - 1, d);
                return { date, reminders: reminders[k] };
            })
            .filter(r => new Date(r.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (items.length === 0) {
            return <li className="text-gray-500 text-xs">No upcoming events</li>;
        }

        return items.map((r, index) => (
            <li key={`event-${index}`} className="border rounded p-2 mb-2">
                <div className="text-sm font-semibold">{r.date.toDateString()}</div>
                {r.reminders.map((reminder, rIndex) => (
                    <div key={`reminder-${index}-${rIndex}`} className="mb-2">
                        <div className="text-xs text-gray-700">
                            {reminder.time} - {reminder.note}
                        </div>
                        <span className={`text-[10px] inline-block mt-1 ${categoryColors[reminder.category] || ''} px-2 rounded-full`}>
                            {reminder.category}
                        </span>
                        <button
                            onClick={() => deleteReminderFromSidebar(r.date.toDateString(), reminder.time)}
                            className="text-red-500 text-xs mt-1 ml-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </li>
        ));
    };

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen flex flex-col lg:flex-row items-start justify-center p-4 gap-6">
            {/* Compact Calendar Card */}
            <div className="bg-violet-300 shadow-xl rounded-2xl p-4 w-full max-w-md border border-indigo-200">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold text-indigo-700 mb-2">📅 Interview Calendar</h1>
                    <div className="flex justify-between items-center w-full mb-3">
                        <button
                            onClick={() => updateMonth('prev')}
                            className="text-sm px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                        >
                            ←
                        </button>
                        <h2
                            className="text-sm font-semibold text-gray-800"
                            aria-live="polite"
                        >
                            {currentDate.toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </h2>
                        <button
                            onClick={() => updateMonth('next')}
                            className="text-sm px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                        >
                            →
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs" role="grid">
                    {generateCalendar()}
                </div>
            </div>

            {/* Upcoming Sidebar */}
            <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-xs border border-gray-200">
                <h2 className="text-lg font-semibold text-indigo-600 mb-3">🕒 Upcoming Reminders</h2>
                <ul className="space-y-2 text-sm overflow-y-auto max-h-[500px]" aria-label="Upcoming reminders list">
                    {updateSidebar()}
                </ul>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="bg-white rounded-xl p-5 w-80 shadow-xl animate-fadeIn">
                        <h2 className="text-lg font-semibold text-indigo-600 mb-3">Set Reminder</h2>
                        <label className="text-sm" htmlFor="reminderTime">Time:</label>
                        <input
                            id="time"
                            type="time"
                            value={modalData.time}
                            onChange={handleInputChange}
                            className="w-full mt-1 mb-2 p-1 border rounded"
                        />

                        <label className="text-sm" htmlFor="reminderNote">Note:</label>
                        <textarea
                            id="note"
                            rows="2"
                            value={modalData.note}
                            onChange={handleInputChange}
                            className="w-full mt-1 mb-2 p-1 border rounded"
                        ></textarea>

                        <label className="text-sm" htmlFor="reminderCategory">Category:</label>
                        <select
                            id="category"
                            value={modalData.category}
                            onChange={handleInputChange}
                            className="w-full mt-1 mb-4 p-1 border rounded"
                        >

                            <option value="Technical">Technical</option>
                            <option value="HR">HR</option>
                            <option value="Follow-up">Follow-up</option>
                        </select>


                        <div className="flex justify-between">
                            <button
                                onClick={saveReminder}
                                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
                            >
                                Save
                            </button>
                            {isDeleteVisible && (
                                <button
                                    onClick={deleteReminder}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }
            `}</style>

        </div >
    );
};

export default AdvancedInterviewCalendar;