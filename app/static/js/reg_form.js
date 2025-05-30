        let currentStep = 1;
    
        function goToNextStep() {
            // Validar los campos del paso actual
            const currentFormStep = document.getElementById(`step${currentStep}`);
            const inputs = currentFormStep.querySelectorAll('input, select');
            let isValid = true;
    
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.reportValidity(); // Muestra el mensaje de validación
                }
            });
    
            // Si todos los campos son válidos, avanzar al siguiente paso
            if (isValid && currentStep < 3) {
                document.getElementById(`step${currentStep}`).classList.remove('active');
                currentStep++;
                document.getElementById(`step${currentStep}`).classList.add('active');
                updateProgressBar();
            }
        }
    
        function goToPreviousStep() {
            if (currentStep > 1) {
                document.getElementById(`step${currentStep}`).classList.remove('active');
                currentStep--;
                document.getElementById(`step${currentStep}`).classList.add('active');
                updateProgressBar();
            }
        }
    
        function updateProgressBar() {
            const progress = document.getElementById('progress');
            progress.style.width = `${(currentStep / 3) * 100}%`;
        }