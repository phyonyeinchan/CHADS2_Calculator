document.addEventListener('DOMContentLoaded', () => {
    // --- Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });

            // Add active class to clicked button and target content
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            targetContent.style.display = 'grid'; // because it uses .calculator-grid which is display: grid
            // Short delay to allow display to apply before adding class for potential transitions
            setTimeout(() => targetContent.classList.add('active'), 10);
        });
    });

    // --- Checkbox Styling Logic ---
    const checkboxes = document.querySelectorAll('.checkbox-card input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            if (this.checked) {
                this.closest('.checkbox-card').classList.add('checked');
            } else {
                this.closest('.checkbox-card').classList.remove('checked');
            }
        });
    });

    // --- CHA2DS2-VASc Logic ---
    const chadsForm = document.getElementById('chads-form');
    const chadsTotalScoreEl = document.getElementById('chads-total-score');
    const strokeRiskEl = document.getElementById('stroke-risk');
    const chadsRecBox = document.getElementById('chads-recommendation-box');
    const chadsRecText = document.getElementById('chads-recommendation-text');

    const riskRates = {
        0: "0.2%", 1: "0.6%", 2: "2.2%", 3: "3.2%", 4: "4.8%",
        5: "7.2%", 6: "9.7%", 7: "11.2%", 8: "10.8%", 9: "12.2%"
    };

    function calculateChadsScore() {
        let score = 0;
        const ageVal = parseInt(document.querySelector('input[name="age"]:checked').value);
        const sexVal = parseInt(document.querySelector('input[name="sex"]:checked').value);
        score += ageVal + sexVal;

        ['chf', 'htn', 'stroke', 'vascular', 'diabetes'].forEach(id => {
            const el = document.getElementById(id);
            if (el.checked) score += parseInt(el.value);
        });

        updateChadsUI(score, sexVal === 1);
    }

    function updateChadsUI(score, isFemale) {
        chadsTotalScoreEl.textContent = score;
        strokeRiskEl.textContent = riskRates[score] || "N/A";

        chadsRecBox.className = 'recommendation-box';
        let text = "";

        if (score === 0 || (score === 1 && isFemale)) {
            chadsRecBox.classList.add('rec-low');
            text = "Low risk. No antithrombotic therapy is recommended.";
        } else if (score === 1 || (score === 2 && isFemale)) {
            chadsRecBox.classList.add('rec-moderate');
            text = "Moderate risk. Oral anticoagulation should be considered, taking into account bleeding risk and patient preference.";
        } else {
            chadsRecBox.classList.add('rec-high');
            text = "High risk. Oral anticoagulation is recommended to prevent stroke.";
        }

        chadsRecText.textContent = text;
    }

    chadsForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', calculateChadsScore);
    });

    // --- HAS-BLED Logic ---
    const hasbledForm = document.getElementById('hasbled-form');
    const hasbledTotalScoreEl = document.getElementById('hasbled-total-score');
    const hasbledRecBox = document.getElementById('hasbled-recommendation-box');
    const hasbledRecText = document.getElementById('hasbled-recommendation-text');

    function calculateHasbledScore() {
        let score = 0;
        const hbIds = ['hb-htn', 'hb-renal', 'hb-liver', 'hb-stroke', 'hb-bleeding', 'hb-labile', 'hb-elderly', 'hb-drugs', 'hb-alcohol'];

        hbIds.forEach(id => {
            const el = document.getElementById(id);
            if (el.checked) score += parseInt(el.value);
        });

        updateHasbledUI(score);
    }

    function updateHasbledUI(score) {
        hasbledTotalScoreEl.textContent = score;

        hasbledRecBox.className = 'recommendation-box';
        let text = "";

        if (score < 3) {
            hasbledRecBox.classList.add('rec-low');
            text = "Low bleeding risk. Standard clinical review is appropriate.";
        } else {
            // Score >= 3
            hasbledRecBox.classList.add('rec-high');
            text = "High bleeding risk (Score ≥ 3). This is not a reason to withhold OAC, but rather flags patients for more careful review, closer follow-up, and correction of modifiable bleeding risk factors (e.g., uncontrolled hypertension, alcohol intake, NSAID use).";
        }

        hasbledRecText.textContent = text;
    }

    hasbledForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', calculateHasbledScore);
    });

    // Initial calculations
    calculateChadsScore();
    calculateHasbledScore();
});
