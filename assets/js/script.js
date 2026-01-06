let shareCount = 0;
const MAX_SHARES = 5;

// Translation Data
const texts = {
    en: {
        groupTitle: "💦🔞 Sugar Mummy Chat Room Group1 🔞💦",
        invitationText: "Invitation to WhatsApp Group",
        joinChatBtn: "Join Chat",
        shareInstructions: "You must be an active user of WhatsApp to join this Group. Share to 5 groups to verify.",
        shareBtn: "Share",
        activateInstructions: "Complete the sharing process to unlock the Join button.",
        joinGroupBtn: "Join Group",
        downloadMessage: "You don't have WhatsApp yet?",
        downloadText: "Download",
        progressText: "Progress: "
    },
    sw: {
        groupTitle: "💦🔞 Chumba cha Mazungumzo cha Sugar Mummy Group1 🔞💦",
        invitationText: "Mwito wa Kujiunga na Kikundi cha WhatsApp",
        joinChatBtn: "Jiunge na Chat",
        shareInstructions: "Lazima uwe mtumiaji hai wa WhatsApp ili kujiunga. Shiriki kwa vikundi 5 kuthibitisha.",
        shareBtn: "Shiriki",
        activateInstructions: "Kamilisha mchakato wa kushiriki ili kufungua kitufe cha kujiunga.",
        joinGroupBtn: "Jiunge na Kikundi",
        downloadMessage: "Huna WhatsApp bado?",
        downloadText: "Pakua",
        progressText: "Maendeleo: "
    },
    zh: {
        groupTitle: "💦🔞 糖妈聊天群组1 🔞💦",
        invitationText: "邀请加入WhatsApp群组",
        joinChatBtn: "加入聊天",
        shareInstructions: "您必须是WhatsApp活跃用户。分享至5个群组以验证。",
        shareBtn: "分享",
        activateInstructions: "完成分享过程以解锁加入按钮。",
        joinGroupBtn: "加入群组",
        downloadMessage: "还没有WhatsApp？",
        downloadText: "下载",
        progressText: "进度: "
    },
    ja: {
        groupTitle: "💦🔞 シュガーマミーチャットルームグループ1 🔞💦",
        invitationText: "WhatsAppグループへの招待",
        joinChatBtn: "チャットに参加",
        shareInstructions: "WhatsAppのアクティブユーザーである必要があります。5つのグループに共有して確認してください。",
        shareBtn: "共有",
        activateInstructions: "共有プロセスを完了して、参加ボタンのロックを解除してください。",
        joinGroupBtn: "グループに参加",
        downloadMessage: "WhatsAppをまだ持っていませんか？",
        downloadText: "ダウンロード",
        progressText: "進捗: "
    }
};

// Function to handle language changes
function changeLanguage() {
    const language = document.getElementById('languageDropdown').value;
    const selectedTexts = texts[language] || texts['en'];

    document.querySelector('.group-title').textContent = selectedTexts.groupTitle;
    document.querySelector('.invitation-text').textContent = selectedTexts.invitationText;
    document.querySelector('.join-btn').textContent = selectedTexts.joinChatBtn;
    
    // Update share section texts if they are visible
    const shareInstr = document.querySelector('.share-instructions');
    if(shareInstr) shareInstr.textContent = selectedTexts.shareInstructions;
    
    const shareBtn = document.getElementById('share-btn');
    if(shareBtn) shareBtn.textContent = selectedTexts.shareBtn;

    const actInstr = document.querySelector('.activate-instructions');
    if(actInstr) actInstr.textContent = selectedTexts.activateInstructions;

    const joinGrp = document.getElementById('join-group-btn');
    if(joinGrp) joinGrp.textContent = selectedTexts.joinGroupBtn;

    document.querySelector('.download-message').innerHTML = selectedTexts.downloadMessage + "<br><span class='download-text'>" + selectedTexts.downloadText + "</span>";
    
    // Update progress text if exists
    updateProgressUI();
}

// Function to transition from Join Screen to Share Screen
function showShareButton() {
    const joinChatButton = document.querySelector('.join-btn');
    const shareSection = document.getElementById('share-section');
    const greyLine = document.querySelector('.grey-line');
    const downloadMessage = document.querySelector('.download-message');

    // Hide initial elements
    joinChatButton.style.display = 'none';
    if (greyLine) greyLine.style.display = 'none';
    if (downloadMessage) downloadMessage.style.display = 'none';

    // Show Share Section
    shareSection.style.display = 'flex';

    // Inject Progress Bar if it doesn't exist
    if (!document.getElementById('progress-bar-container')) {
        const progressHTML = `
            <div class="progress-wrapper">
                <span id="progress-text-label" class="progress-text">0%</span>
                <div class="progress-container">
                    <div id="progress-bar-fill" class="progress-bar"></div>
                </div>
            </div>
        `;
        // Insert before the share button
        const shareBtn = document.getElementById('share-btn');
        shareBtn.insertAdjacentHTML('beforebegin', progressHTML);
    }
    
    // Trigger language update to ensure text matches
    changeLanguage();
}

function updateProgressUI() {
    const language = document.getElementById('languageDropdown').value;
    const label = texts[language] ? texts[language].progressText : "Progress: ";
    const percentage = Math.floor((shareCount / MAX_SHARES) * 100);
    
    const textLabel = document.getElementById('progress-text-label');
    const fillBar = document.getElementById('progress-bar-fill');

    if (textLabel && fillBar) {
        textLabel.textContent = `${label} ${percentage}% (${shareCount}/${MAX_SHARES})`;
        fillBar.style.width = `${percentage}%`;
    }
}

// Main Share Function
function shareOnWhatsApp() {
    // 1. Redirect to WhatsApp App
    // We use a timeout to simulate checking if the user actually shared, 
    // though we can only track the click.
    const message = encodeURIComponent(`💦Join the best Sugar Mummy Telegram Chat Room💦

🌟African Sugar Mummies ✅
🌟European Sugar Mummies ✅
🌟American Sugar Mummies ✅
🌟Australian Sugar Mummies ✅

Rules:
1. You must be 18+ Years
2. No abuses allowed
3. Share with 5 Groups before Joining

  Link: https://chat.whatsapp.com/invite/xxxxxxx`);
    
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // 2. Increment Logic
    if (shareCount < MAX_SHARES) {
        shareCount++;
        
        // Update Progress Bar
        updateProgressUI();
    }

    // 3. Check for Completion
    if (shareCount >= MAX_SHARES) {
        completeSharing();
    }
}

function completeSharing() {
    const joinGroupBtn = document.getElementById('join-group-btn');
    const shareBtn = document.getElementById('share-btn');
    const shareInstructions = document.querySelector('.share-instructions');
    
    // Enable the button
    joinGroupBtn.disabled = false;
    joinGroupBtn.classList.add('active');
    
    // Set the required URL
    // Removing the onclick attribute from HTML to ensure clean JS handling or strictly setting href
    joinGroupBtn.onclick = function() {
        window.location.href = 'https://afroraw.com';
    };

    // Hide share instructions and button to clean up UI
    if(shareBtn) shareBtn.style.display = 'none';
    if(shareInstructions) shareInstructions.style.display = 'none';
    
    // Update instructions text
    const actInstr = document.querySelector('.activate-instructions');
    actInstr.textContent = "Verification Successful! You can now join the group.";
    actInstr.style.color = "#25D366";
    actInstr.style.fontWeight = "bold";
}

// Initialization
window.onload = function() {
    changeLanguage();
    // Expose functions to global scope for HTML onclick attributes
    window.showShareButton = showShareButton;
    window.shareOnWhatsApp = shareOnWhatsApp;
    window.changeLanguage = changeLanguage;
};