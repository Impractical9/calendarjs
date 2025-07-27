// Seleccionamos elementos del DOM
const daysContainer = document.getElementById('days-container');
const monthYearElement = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

// Obtenemos la fecha actual
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Función principal para renderizar el calendario
function renderCalendar() {
    // Obtenemos el primer día del mes y el último día del mes
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Obtenemos el día de la semana del primer día (0-6 donde 0 es domingo)
    const firstDayIndex = firstDay.getDay();
    
    // Obtenemos el último día del mes
    const lastDayDate = lastDay.getDate();
    
    // Obtenemos el último día del mes anterior
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    // Actualizamos el título del mes y año
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;
    
    // Preparamos los días
    let days = '';
    
    // Días del mes anterior (para completar la primera semana)
    for (let i = firstDayIndex; i > 0; i--) {
        days += `<div class="empty">${prevLastDay - i + 1}</div>`;
    }
    
    // Días del mes actual
    for (let i = 1; i <= lastDayDate; i++) {
        // Comprobamos si es el día actual
        const isToday = 
            i === currentDate.getDate() && 
            currentMonth === currentDate.getMonth() && 
            currentYear === currentDate.getFullYear();
        
        // Añadimos la clase 'today' si es el día actual
        const todayClass = isToday ? 'today' : '';
        days += `<div class="${todayClass}" data-day="${i}">${i}</div>`;
    }
    
    // Calculamos cuántos días faltan para completar la cuadrícula (6 filas)
    const totalDaysShown = firstDayIndex + lastDayDate;
    const remainingDays = 42 - totalDaysShown; // 6 semanas * 7 días
    
    // Días del próximo mes (para completar la última semana)
    for (let i = 1; i <= remainingDays; i++) {
        days += `<div class="empty">${i}</div>`;
    }
    
    // Insertamos los días en el contenedor
    daysContainer.innerHTML = days;
    
    // Añadimos event listeners a los días
    document.querySelectorAll('[data-day]').forEach(day => {
        day.addEventListener('click', () => {
            // Removemos la clase 'selected' de todos los días
            document.querySelectorAll('[data-day]').forEach(d => {
                d.classList.remove('selected');
            });
            
            // Añadimos la clase 'selected' al día clickeado
            day.classList.add('selected');
            
            // Aquí puedes hacer algo con la fecha seleccionada
            console.log(`Día seleccionado: ${day.dataset.day}/${currentMonth + 1}/${currentYear}`);
        });
    });
}

// Event listeners para los botones de navegación
prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Renderizamos el calendario inicial
renderCalendar();