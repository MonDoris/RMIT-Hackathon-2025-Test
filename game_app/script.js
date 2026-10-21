/* ============================================================================
   SCAMBAITER v3.0 - ENGINE ÂM THANH WEB AUDIO + 3 CHUYÊN ÁN + 3 MINIGAMES
   ============================================================================ */

// 1. BỘ TỔNG HỢP ÂM THANH (WEB AUDIO SYNTH - KHÔNG CẦN FILE MP3 NGOÀI)
let sfxEnabled = true;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
    if (!sfxEnabled) return;
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'msg') {
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'hack') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(600, now + 0.06);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
    } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
        osc.start(now); osc.stop(now + 0.28);
    } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554, now + 0.1);
        osc.frequency.setValueAtTime(659, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
        osc.start(now); osc.stop(now + 0.45);
    }
}

// 2. DỮ LIỆU 3 CHUYÊN ÁN TỘI PHẠM MẠNG (MULTI-CASE DATA)
const CASES = [
    {
        id: 0,
        badge: "CHUYÊN ÁN #01: MẠO DANH CÔNG AN",
        scamName: "Đại Úy Trần Hoàng (CSĐT)",
        scamAvatar: "👮",
        scamStatus: "● Zalo Bảo Mật - Bộ Công An (Giả Mạo)",
        tip: "Công an KHÔNG BAO GIỜ làm việc qua Zalo hay yêu cầu cài đặt file .APK ngoài chợ ứng dụng để xác minh tài sản.",
        evidence: {
            ip: "103.114.98.42 (Proxy)",
            device: "Win11 // NoxPlayer Emulator",
            bank: "1029384756 - VCB (TK Mua Lại)",
            loc: "Khu Tự Trị Mộc Bài - biên giới"
        },
        lesson: "Tuyệt đối không cài đặt ứng dụng lạ (.APK) hoặc cấp quyền Trợ năng (Accessibility) trên điện thoại. Khi kẻ gian có quyền này, chúng sẽ đọc được mã OTP ngân hàng và chiếm đoạt toàn bộ tiền tiết kiệm.",
        steps: [
            {
                scam: "Thông báo khẩn từ Cơ quan CSĐT! CMND của ông/bà đang đứng tên một tài khoản ngân hàng nhận 3,5 tỷ đồng từ đường dây rửa tiền xuyên quốc gia. Yêu cầu hợp tác điều tra ngay, nếu không chúng tôi sẽ phát lệnh bắt tạm giam trong 2 giờ tới!",
                choices: [
                    {
                        text: "Trời đất ơi! Tôi ở nhà làm ruộng với trông cháu chứ có biết rửa tiền là gì đâu chú Công an ơi! Cứu tôi với!",
                        greed: 25, susp: -5, trace: 20,
                        term: "> [PSYCHOLOGY] Mục tiêu tin rằng nạn nhân đã hoảng loạn. Lòng tham tăng mạnh.",
                        next: 1
                    },
                    {
                        text: "Công an nào làm việc qua Zalo? Mày định lừa ai hả thằng kia?",
                        greed: 0, susp: 100, trace: 0,
                        term: "> [ERROR] Bứt dây động rừng! Đối tượng đã xóa tài khoản và chặn liên lạc.",
                        next: -1
                    }
                ]
            },
            {
                scam: "Muốn chứng minh trong sạch thì tuyệt đối giữ bí mật, không được nói với con cháu! Hiện ông/bà có bao nhiêu tiền tiết kiệm phải khai báo và tải ngay phần mềm Bảo Vệ Tài Sản 'VNeID_CongAn.apk' này về máy để đồng bộ hóa!",
                sysAlert: "⚠️ ĐỐI TƯỢNG ĐÃ GỬI FILE ĐÍNH KÈM: VNeID_CongAn.apk (Chứa Trojan chiếm quyền điều khiển)",
                requireCmd: "decompile_apk",
                cmdHint: "Gợi ý: Bấm nút [decompile_apk] bên phải để dịch ngược mã nguồn file độc hại của hắn!",
                afterCmdText: "> [APK ANALYZER] Phát hiện Spyware 'GoldDigger' kết nối về C2 IP: 103.114.98.42!",
                unlockEv: ["ip", "device"],
                choices: [
                    {
                        text: "Chú ơi mắt bác kém lắm không bấm cài được, bác có sổ tiết kiệm 3 tỷ vừa rút về để trong tài khoản, bác chụp cái biên lai gửi chú xem trước nhé!",
                        greed: 45, susp: 10, trace: 35,
                        term: "> [TRAP READY] Đã nhúng Canary Token vào file 'Bien_Lai_3Ty.pdf.exe'.",
                        next: 2
                    }
                ]
            },
            {
                scam: "Đâu? 3 tỷ cơ à?! Gửi nhanh cái ảnh biên lai qua đây tôi kiểm tra xem nào!",
                choices: [
                    {
                        text: "📎 [Gửi file mồi nhử: Bien_Lai_Tiet_Kiem_3Ty.jpg]",
                        greed: 30, susp: 40, trace: 25,
                        term: "> [PAYLOAD SENT] Mục tiêu đã mở file! Đang trích xuất tài khoản ngân hàng nhận tiền...",
                        unlockEv: ["bank"],
                        next: 3
                    }
                ]
            },
            {
                // PLOT TWIST: KẺ LỪA ĐẢO LẬT MẶT TẤN CÔNG NGƯỢC BẰNG OSINT
                isTwist: true,
                scam: "KHOAN ĐÃ... File ảnh này gắn mã độc định vị IP à?! Mày không phải ông già! Mày là sinh viên IT định săn ngược bọn tao đúng không?! Mày tưởng chỉ mình mày biết xài Kali Linux à? Tao vừa quét ngược WebRTC của mày và thả Ransomware khóa ổ cứng của mày rồi con trai! Chuẩn bị 50 triệu tiền chuộc dữ liệu đi!",
                minigameType: "malware",
                requireCmd: "block_firewall",
                cmdHint: "🚨 KHẨN CẤP: Gõ hoặc bấm [block_firewall] để bật lá chắn và diệt gói tin Ransomware!"
            }
        ]
    },
    {
        id: 1,
        badge: "CHUYÊN ÁN #02: BÓNG MA DEEPFAKE",
        scamName: "Minh Khôi (Tài khoản bị Hack)",
        scamAvatar: "😰",
        scamStatus: "● Messenger - Đang gọi Video...",
        tip: "Công nghệ AI Deepfake có thể nhại khuôn mặt và giọng nói trong các cuộc gọi ngắn chập chờn. Hãy luôn hỏi một 'Câu hỏi mật khẩu gia đình' hoặc gọi lại vào số sim di động chính chủ.",
        evidence: {
            ip: "45.77.210.19 (VPN Singapore)",
            device: "DeepFaceLive GPU Rig (RTX 4090)",
            bank: "8899112233 - Techcombank (Mule)",
            loc: "Đặc khu Tam Giác Vàng"
        },
        lesson: "Khi nhận cuộc gọi video báo tin tai nạn hoặc mượn tiền gấp với hình ảnh mờ nhòe, âm thanh ngắt quãng, hãy bình tĩnh ngắt máy và gọi điện thoại di động thông thường cho người thân để xác minh.",
        steps: [
            {
                showVideo: true,
                scam: "[CUỘC GỌI VIDEO CHẬP CHỜN 5 GIÂY RỒI TẮT] Bác ơi cứu cháu với! Cháu vừa lỡ tông trúng một phụ nữ mang thai ngoài đường, người nhà họ đang vây đánh cháu, bắt đền 80 triệu ngay lập tức nếu không họ giao cháu cho công an!",
                choices: [
                    {
                        text: "Khôi đấy hả cháu?! Sao mặt mũi mờ tịt thế? Cháu đang ở bệnh viện nào để bác chạy ra?",
                        greed: 30, susp: 0, trace: 25,
                        term: "> [STREAM CAPTURED] Đã ghi lại 5 giây luồng Video Call để phân tích sinh trắc học.",
                        next: 1
                    },
                    {
                        text: "Cái mặt AI ghép lộ liễu thế kia mà đòi lừa tao à?",
                        greed: 0, susp: 100, trace: 0,
                        term: "> [ERROR] Kẻ lừa đảo lập tức thu hồi tin nhắn và khóa tài khoản.",
                        next: -1
                    }
                ]
            },
            {
                scam: "Điện thoại cháu rơi vỡ camera với sóng yếu lắm không nói chuyện lâu được! Bác chuyển gấp 80 triệu vào STK 8899112233 của anh Hùng người nhà nạn nhân giúp cháu trong 3 phút nhé!",
                requireCmd: "deepfake_scan",
                cmdHint: "Gợi ý: Bấm nút [deepfake_scan] để phân tích 5 giây video và bóc trần bộ lọc AI!",
                afterCmdText: "> [AI FORENSICS] Phát hiện lệch khung xương hàm 34% và tần số giọng nói nhân tạo RVC v2!",
                unlockEv: ["ip", "device", "bank"],
                choices: [
                    {
                        text: "Bác đang vào app ngân hàng rồi, nhưng Khôi nhắc lại cho bác tên con chó cưng ở nhà mình là gì để bác yên tâm chuyển tiền nào?",
                        greed: 40, susp: 35, trace: 45,
                        term: "> [SOCIAL TEST] Đòn hỏi mật khẩu gia đình khiến kịch bản của kẻ gian bị vỡ!",
                        next: 2
                    }
                ]
            },
            {
                // PLOT TWIST: KẺ LỪA ĐẢO CHUYỂN SANG ĐE DỌA BẮT CÓC TỐNG TIỀN
                isTwist: true,
                scam: "Mày hỏi chó mèo cái gì?! Tao nói thẳng luôn: Thằng cháu mày đang nằm trong tay bọn tao ở biên giới rồi! Mày vừa dò IP của tụi tao đúng không? Trong 30 giây không giải ngân 80 triệu, tao phát tán toàn bộ ảnh ghép nhạy cảm của cả họ nhà mày lên mạng!",
                minigameType: "deepfake_nodes",
                requireCmd: "freeze_mule_bank",
                cmdHint: "🚨 KHẨN CẤP: Bấm [freeze_mule_bank] để khóa tài khoản nhận tiền và giải mã máy chủ Deepfake!"
            }
        ]
    },
    {
        id: 2,
        badge: "CHUYÊN ÁN #03: SÀN CRYPTO & VIỆC NHẸ LƯƠNG CAO",
        scamName: "Trưởng Phòng HR - Tập Đoàn Quốc Tế",
        scamAvatar: "💎",
        scamStatus: "● Telegram Group VIP (1.200 thành viên ảo)",
        tip: "Chiêu trò 'Thả con săn sắt, bắt con cá rô': Bọn lừa đảo sẵn sàng chuyển thật cho bạn 100k - 500k ở 2 nhiệm vụ đầu để kích thích lòng tham, trước khi lừa bạn nạp hàng chục triệu đồng.",
        evidence: {
            ip: "185.220.101.7 (Tor Exit Node)",
            device: "Linux Botnet Controller",
            bank: "Ví USDT: T9yD14Nj9...88xK (Tron)",
            loc: "Tòa nhà Casino Khu B - Bavet"
        },
        lesson: "Không có công việc 'bấm like, chốt đơn ảo' nào trả hoa hồng 20-30% mỗi ca. Mọi sàn tiền ảo yêu cầu nạp thêm tiền để 'giải băng tài khoản' hoặc 'nộp thuế rút tiền' đều là lừa đảo 100%.",
        steps: [
            {
                scam: "Chào bạn! Chúc mừng bạn đã hoàn thành Nhiệm vụ 1 (Tăng tương tác thương mại điện tử). Kế toán đã chuyển 300.000đ tiền hoa hồng vào tài khoản của bạn. Bây giờ mời bạn lên Gói Nhiệm Vụ VIP Liên Kết Sàn Quốc Tế: Nạp 25 triệu nhận ngay 35 triệu sau 10 phút!",
                choices: [
                    {
                        text: "Ồ nhận được 300k thật này! Ngon quá chị ơi, em đang có sẵn 100 triệu tiền nhàn rỗi, cho em lên thẳng gói Kim Cương luôn được không?",
                        greed: 50, susp: -10, trace: 30,
                        term: "> [REVERSE BAIT] Bạn vừa rút gọn 300k tiền thật của bọn scammer (quỹ từ thiện) và tung mồi nhử 100 triệu!",
                        next: 1
                    },
                    {
                        text: "Thôi cảm ơn, ăn 300k của tụi mày xong tao nghỉ chơi đây!",
                        greed: 0, susp: 100, trace: 0,
                        term: "> [MISSION ABORTED] Bạn lời được 300k nhưng chưa bắt được sào huyệt của chúng!",
                        next: -1
                    }
                ]
            },
            {
                scam: "Tuyệt vời! Để vào gói Kim Cương 100 triệu, bạn hãy kết nối ví Crypto của bạn vào Hợp đồng Thông minh (Smart Contract) độc quyền này của sàn để nhận thưởng tự động nhé: https://usdt-vip-claim-vn.org",
                sysAlert: "⚠️ PHÁT HIỆN LINK WALLET DRAINER (Hợp đồng thông minh rút sạch tiền trong ví)",
                requireCmd: "honeypot_inject",
                cmdHint: "Gợi ý: Bấm nút [honeypot_inject] để tráo đổi Smart Contract của chúng thành bẫy Honeypot!",
                afterCmdText: "> [HONEYPOT DEPLOYED] Đã gắn mã theo dõi ngược vào địa chỉ ví tổng T9yD14Nj9...88xK!",
                unlockEv: ["ip", "device", "bank"],
                choices: [
                    {
                        text: "Em vừa ký xác nhận Smart Contract trên ví lạnh rồi đó chị, chị bảo kỹ thuật viên bên sàn duyệt lệnh rút 100 triệu từ ví em đi!",
                        greed: 45, susp: 25, trace: 40,
                        term: "> [HOOKED] Trùm cuối của sàn đang dùng khóa Private Key để rút tiền từ Honeypot của bạn!",
                        next: 2
                    }
                ]
            },
            {
                // PLOT TWIST: CẢ Ổ TỘI PHẠM HỘI ĐỒNG & ĐỐT SERVER
                isTwist: true,
                scam: "[HỆ THỐNG BÁO ĐỘNG] Á à! Ví của mày là ví bẫy Honeypot của Cục An ninh mạng! Anh em kỹ thuật đâu, kích hoạt lệnh XÓA SẠCH DATABASE và đánh sập cổng mạng của thằng đặc vụ này trong 30 giây!",
                minigameType: "hex_decrypt",
                requireCmd: "seize_cold_wallet",
                cmdHint: "🚨 KHẨN CẤP: Bấm [seize_cold_wallet] để bẻ khóa 4 lớp mã Hex và thu giữ toàn bộ quỹ đen!"
            }
        ]
    }
];

// 3. BIẾN TRẠNG THÁI TOÀN CỤC
let activeCase = null;
let currentStepIdx = 0;
let hp = 100;
let trace = 0;
let greed = 10;
let suspicion = 15;
let unlockedCmd = null;
let cmdExecuted = false;
let countdownTimer = null;
let timeLeft = 30;

// DOM ELEMENTS
const EL = {
    menuScreen: document.getElementById('menu-screen'),
    playScreen: document.getElementById('play-screen'),
    resultScreen: document.getElementById('result-screen'),
    badge: document.getElementById('active-case-badge'),
    hpBar: document.getElementById('hp-bar'),
    traceBar: document.getElementById('trace-bar'),
    globalTimer: document.getElementById('global-timer'),
    abortBtn: document.getElementById('abort-btn'),
    scamAvatar: document.getElementById('scam-avatar'),
    scamName: document.getElementById('scam-name'),
    scamStatus: document.getElementById('scam-status'),
    greedVal: document.getElementById('greed-val'),
    greedFill: document.getElementById('greed-fill'),
    suspVal: document.getElementById('suspicion-val'),
    suspFill: document.getElementById('suspicion-fill'),
    videoBox: document.getElementById('video-call-box'),
    chatBox: document.getElementById('chat-box'),
    typing: document.getElementById('typing-indicator'),
    choicesBox: document.getElementById('choices-box'),
    termBody: document.getElementById('terminal-body'),
    deckBtns: document.getElementById('deck-buttons'),
    cmdInput: document.getElementById('cmd-input'),
    tipText: document.getElementById('cyber-tip-text'),
    alarm: document.getElementById('alarm-overlay'),
    mgModal: document.getElementById('minigame-modal'),
    mgTitle: document.getElementById('mg-title'),
    mgDesc: document.getElementById('mg-desc'),
    mgArena: document.getElementById('mg-arena')
};

// 4. KHỞI TẠO CHUYÊN ÁN
function selectCase(caseIdx) {
    playSound('hack');
    activeCase = CASES[caseIdx];
    currentStepIdx = 0;
    hp = 100;
    trace = 0;
    greed = 15;
    suspicion = 10;
    unlockedCmd = null;
    cmdExecuted = false;

    // Chuyển màn hình
    EL.menuScreen.classList.remove('active');
    EL.menuScreen.classList.add('hidden');
    EL.resultScreen.classList.remove('active');
    EL.resultScreen.classList.add('hidden');
    EL.playScreen.classList.remove('hidden');
    EL.playScreen.classList.add('active');
    EL.abortBtn.classList.remove('hidden');

    // Cài đặt giao diện theo vụ án
    EL.badge.innerText = activeCase.badge;
    EL.scamAvatar.innerText = activeCase.scamAvatar;
    EL.scamName.innerText = activeCase.scamName;
    EL.scamStatus.innerText = activeCase.scamStatus;
    EL.tipText.innerText = activeCase.tip;
    EL.videoBox.classList.add('hidden');
    EL.chatBox.innerHTML = '';
    EL.choicesBox.innerHTML = '';
    EL.termBody.innerHTML = '';

    resetRadarAndEvidence();
    updateHUD();

    logTerm(`> Khởi động chuyên án: ${activeCase.badge}`, 'log-sys');
    logTerm(`> Đã kết nối máy ảo Sandbox bảo mật. Sẵn sàng chặn bắt gói tin...`);

    renderStep(0);
}

function resetRadarAndEvidence() {
    ['ip', 'device', 'bank', 'loc'].forEach(k => {
        const card = document.getElementById(`ev-${k}`);
        card.classList.remove('unlocked');
        document.getElementById(`ev-${k}-val`).innerText = "Chưa giải mã";
    });
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`line-${i}`).classList.remove('traced');
        document.getElementById(`node-${i}`).classList.remove('active-node', 'target-locked');
    }
    document.getElementById('label-1').innerText = "Proxy #1: ???";
    document.getElementById('label-2').innerText = "VPN C2: ???";
    document.getElementById('label-3').innerText = "Sào Huyệt: ẨN";
}

function unlockEvidenceItems(keys) {
    if (!keys) return;
    keys.forEach(k => {
        const card = document.getElementById(`ev-${k}`);
        card.classList.add('unlocked');
        document.getElementById(`ev-${k}-val`).innerText = activeCase.evidence[k];

        if (k === 'ip') {
            document.getElementById('line-1').classList.add('traced');
            document.getElementById('node-1').classList.add('active-node');
            document.getElementById('label-1').innerText = activeCase.evidence.ip.split(' ')[0];
        }
        if (k === 'bank') {
            document.getElementById('line-2').classList.add('traced');
            document.getElementById('node-2').classList.add('active-node');
            document.getElementById('label-2').innerText = "Mule Bank Traced";
        }
        if (k === 'loc') {
            document.getElementById('line-3').classList.add('traced');
            document.getElementById('node-3').classList.add('target-locked');
            document.getElementById('label-3').innerText = activeCase.evidence.loc;
        }
    });
}

function updateHUD() {
    greed = Math.min(100, Math.max(0, greed));
    suspicion = Math.min(100, Math.max(0, suspicion));
    trace = Math.min(100, Math.max(0, trace));

    EL.hpBar.style.width = `${hp}%`;
    EL.traceBar.style.width = `${trace}%`;
    EL.greedVal.innerText = `${greed}%`;
    EL.greedFill.style.width = `${greed}%`;
    EL.suspVal.innerText = `${suspicion}%`;
    EL.suspFill.style.width = `${suspicion}%`;
}

function logTerm(text, cls = '') {
    const p = document.createElement('p');
    p.innerText = text;
    if (cls) p.className = cls;
    EL.termBody.appendChild(p);
    EL.termBody.scrollTop = EL.termBody.scrollHeight;
}

function appendChat(sender, text) {
    playSound(sender === 'dox-alert' ? 'alert' : 'msg');
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    EL.chatBox.appendChild(div);
    EL.chatBox.scrollTop = EL.chatBox.scrollHeight;
}

// 5. LUỒNG DIỄN BIẾN KỊCH BẢN (STEP ENGINE)
function renderStep(idx) {
    const step = activeCase.steps[idx];
    currentStepIdx = idx;
    cmdExecuted = false;
    unlockedCmd = step.requireCmd || null;

    EL.choicesBox.innerHTML = '';
    EL.typing.classList.remove('hidden');

    if (step.showVideo) {
        EL.videoBox.classList.remove('hidden');
    } else {
        EL.videoBox.classList.add('hidden');
    }

    renderCyberDeck(step);

    setTimeout(() => {
        EL.typing.classList.add('hidden');
        appendChat(step.isTwist ? 'dox-alert' : 'scam', step.scam);

        if (step.sysAlert) {
            appendChat('system-alert', step.sysAlert);
        }

        if (step.isTwist) {
            triggerTwistAlert(step);
            return;
        }

        if (step.requireCmd) {
            logTerm(`> [YÊU CẦU KỸ THUẬT] ${step.cmdHint}`, 'log-warn');
        }

        renderChoices(step);
    }, 900);
}

function renderCyberDeck(step) {
    EL.deckBtns.innerHTML = '';
    const defaultCmds = ['help', 'status'];
    if (step.requireCmd) defaultCmds.unshift(step.requireCmd);

    defaultCmds.forEach(cmd => {
        const btn = document.createElement('button');
        btn.className = 'deck-btn' + (cmd === step.requireCmd ? ' urgent' : '');
        btn.innerText = `[${cmd}]`;
        btn.onclick = () => executeCommand(cmd);
        EL.deckBtns.appendChild(btn);
    });
}

function renderChoices(step) {
    EL.choicesBox.innerHTML = '';
    if (!step.choices) return;

    step.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = c.text;
        btn.onclick = () => {
            if (step.requireCmd && !cmdExecuted) {
                playSound('alert');
                logTerm(`> [CHẶN HÀNH ĐỘNG] Hãy chạy lệnh [${step.requireCmd}] trên Terminal trước khi gửi tin nhắn để gài bẫy an toàn!`, 'log-err');
                return;
            }
            appendChat('player', c.text);
            greed += c.greed;
            suspicion += c.susp;
            trace += c.trace;
            updateHUD();
            logTerm(c.term);

            if (c.unlockEv) unlockEvidenceItems(c.unlockEv);

            if (c.next === -1) {
                setTimeout(() => finishCase(false, "Bứt dây động rừng! Kẻ lừa đảo đã phát hiện và xóa dấu vết."), 1200);
            } else {
                renderStep(c.next);
            }
        };
        EL.choicesBox.appendChild(btn);
    });
}

// 6. XỬ LÝ LỆNH TERMINAL & CÚ TWIST PHẢN CÔNG
function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;
    playSound('hack');
    logTerm(`root@vncert:~# ${cmd}`, 'log-sys');
    EL.cmdInput.value = '';

    const step = activeCase.steps[currentStepIdx];

    if (cmd === 'help') {
        logTerm(`> Lệnh khả dụng: status, clear` + (unlockedCmd ? `, ${unlockedCmd}` : ''));
        return;
    }
    if (cmd === 'status') {
        logTerm(`> Integrity: ${hp}% | Trace: ${trace}% | Target Greed: ${greed}%`);
        return;
    }

    if (step && cmd === step.requireCmd) {
        cmdExecuted = true;
        if (step.afterCmdText) logTerm(step.afterCmdText, 'log-sys');
        if (step.unlockEv) unlockEvidenceItems(step.unlockEv);
        trace += 15;
        updateHUD();

        if (step.isTwist) {
            launchMinigame(step.minigameType);
        } else {
            logTerm(`> [OK] Đã nạp bẫy thành công! Bây giờ hãy chọn câu trả lời bên khung Chat.`, 'log-warn');
        }
    } else {
        logTerm(`> Lệnh không hợp lệ hoặc chưa cần thiết lúc này. ${unlockedCmd ? 'Hãy dùng: ' + unlockedCmd : ''}`, 'log-err');
    }
}

EL.cmdInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') executeCommand(EL.cmdInput.value);
});

function triggerTwistAlert(step) {
    playSound('alert');
    EL.alarm.classList.remove('hidden');
    EL.globalTimer.classList.remove('hidden');
    logTerm(`>>> BÁO ĐỘNG ĐỎ: TỘI PHẠM PHÁT HIỆN VÀ ĐANG TẤN CÔNG NGƯỢC! <<<`, 'log-err');
    logTerm(step.cmdHint, 'log-warn');

    timeLeft = 30;
    EL.globalTimer.innerText = `🚨 ${timeLeft}s`;
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        timeLeft--;
        hp = Math.max(10, hp - 3);
        updateHUD();
        EL.globalTimer.innerText = `🚨 ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            finishCase(false, "Hết thời gian phản ứng! Tổ chức tội phạm đã xóa sạch dấu vết máy chủ.");
        }
    }, 1000);
}

// 7. BA MINIGAME TÁC CHIẾN ĐẶC BIỆT CHO 3 CHUYÊN ÁN
function launchMinigame(type) {
    EL.mgModal.classList.remove('hidden');
    EL.mgArena.innerHTML = '';

    if (type === 'malware') {
        EL.mgTitle.innerText = "🛡️ MINIGAME 1: TIÊU DIỆT LUỒNG RANSOMWARE";
        EL.mgDesc.innerText = "Click tiêu diệt 8 gói tin mã độc đang xâm nhập trước khi hết giờ!";
        let remaining = 8;
        for (let i = 0; i < remaining; i++) {
            const node = document.createElement('div');
            node.className = 'malware-node';
            node.innerText = '☣️';
            node.style.top = (Math.random() * 75 + 8) + '%';
            node.style.left = (Math.random() * 82 + 6) + '%';
            node.onclick = function() {
                playSound('hack');
                this.remove();
                remaining--;
                if (remaining === 0) winMinigame();
            };
            EL.mgArena.appendChild(node);
        }
    } else if (type === 'deepfake_nodes') {
        EL.mgTitle.innerText = "🎭 MINIGAME 2: BÓC TÁCH LỚP MẶT NẠ AI DEEPFAKE";
        EL.mgDesc.innerText = "Click chọn đúng 3 Điểm Dị Biệt Sinh Trắc Học (Biometric Glitches) để khóa máy chủ render của kẻ gian!";
        const items = [
            { label: "✅ Lệch tần số âm thanh 16kHz (RVC Clone)", valid: true },
            { label: "❌ Ánh sáng nền phòng tự nhiên", valid: false },
            { label: "✅ Nhịp chớp mắt 0 lần/phút (GAN Artifact)", valid: true },
            { label: "❌ Độ phân giải webcam 720p", valid: false },
            { label: "✅ Viền răng và cổ bị nhòe pixel khi quay đầu", valid: true }
        ];
        let found = 0;
        items.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'hex-card';
            btn.innerText = item.label;
            btn.onclick = function() {
                if (item.valid) {
                    playSound('hack');
                    this.style.background = '#00f59b';
                    this.style.color = '#000';
                    this.disabled = true;
                    found++;
                    if (found === 3) winMinigame();
                } else {
                    playSound('alert');
                    hp = Math.max(5, hp - 10);
                    updateHUD();
                }
            };
            EL.mgArena.appendChild(btn);
        });
    } else if (type === 'hex_decrypt') {
        EL.mgTitle.innerText = "🔐 MINIGAME 3: BẺ KHÓA VÍ LẠNH (PORT KNOCKING)";
        EL.mgDesc.innerText = "Bấm lần lượt các cổng bảo mật theo thứ tự TĂNG DẦN (Từ Port nhỏ nhất đến lớn nhất) để chiếm quyền ví tổng!";
        const ports = [
            { num: 443, text: "PORT 0x01BB (443)" },
            { num: 22, text: "PORT 0x0016 (22)" },
            { num: 8080, text: "PORT 0x1F90 (8080)" },
            { num: 3306, text: "PORT 0x0CEA (3306)" }
        ];
        const sorted = [22, 443, 3306, 8080];
        let stepIdx = 0;
        ports.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'hex-card';
            btn.innerText = p.text;
            btn.onclick = function() {
                if (p.num === sorted[stepIdx]) {
                    playSound('hack');
                    this.style.background = '#00f59b';
                    this.style.color = '#000';
                    this.disabled = true;
                    stepIdx++;
                    if (stepIdx === sorted.length) winMinigame();
                } else {
                    playSound('alert');
                    logTerm(`> Sai thứ tự Port! Hãy bấm từ Port nhỏ nhất (22 -> 443 -> 3306 -> 8080).`, 'log-err');
                }
            };
            EL.mgArena.appendChild(btn);
        });
    }
}

function winMinigame() {
    EL.mgModal.classList.add('hidden');
    clearInterval(countdownTimer);
    trace = 100;
    unlockEvidenceItems(['ip', 'device', 'bank', 'loc']);
    updateHUD();
    logTerm(`> [SUCCESS] Đã khóa toàn bộ tọa độ sào huyệt và trích xuất hồ sơ tội phạm!`, 'log-sys');
    setTimeout(() => {
        finishCase(true, "Bạn đã hóa giải đòn phản công và tóm gọn toàn bộ thông tin đường dây lừa đảo!");
    }, 900);
}

// 8. MÀN HÌNH KẾT THÚC & BÁO CÁO PHÁP Y SỐ
function finishCase(isWin, subtitleText) {
    clearInterval(countdownTimer);
    EL.alarm.classList.add('hidden');
    EL.globalTimer.classList.add('hidden');
    EL.mgModal.classList.add('hidden');
    EL.abortBtn.classList.add('hidden');

    EL.playScreen.classList.remove('active');
    EL.playScreen.classList.add('hidden');
    EL.resultScreen.classList.remove('hidden');
    EL.resultScreen.classList.add('active');

    playSound(isWin ? 'win' : 'alert');

    const title = document.getElementById('result-title');
    const stamp = document.getElementById('result-stamp');
    const summary = document.getElementById('forensic-summary');

    document.getElementById('result-subtitle').innerText = subtitleText;
    document.getElementById('impact-lesson').innerText = activeCase.lesson;

    if (isWin) {
        stamp.innerText = "CHUYÊN ÁN HOÀN TẤT // BẮT GIỮ THÀNH CÔNG";
        stamp.style.borderColor = "#00f59b";
        stamp.style.color = "#00f59b";
        title.innerText = "TRIỆT PHÁ THÀNH CÔNG!";
        title.style.color = "#00f59b";
        summary.innerHTML = `
            <p><strong>[+] CHUYÊN ÁN:</strong> ${activeCase.badge}</p>
            <p><strong>[+] IP THỦ PHẠM:</strong> ${activeCase.evidence.ip}</p>
            <p><strong>[+] THIẾT BỊ GÂY ÁN:</strong> ${activeCase.evidence.device}</p>
            <p><strong>[+] TÀI KHOẢN THU GIỮ:</strong> ${activeCase.evidence.bank}</p>
            <p><strong>[+] TỌA ĐỘ SÀO HUYỆT:</strong> ${activeCase.evidence.loc}</p>
            <p><strong>[+] TRẠNG THÁI:</strong> Đã chuyển giao hồ sơ điện tử cho Cục An toàn Thông tin (VN-CERT).</p>
        `;
    } else {
        stamp.innerText = "NHIỆM VỤ THẤT BẠI // MỤC TIÊU TẨU THOÁT";
        stamp.style.borderColor = "#ff2a54";
        stamp.style.color = "#ff2a54";
        title.innerText = "ĐỐI TƯỢNG ĐÃ XÓA DẤU VẾT!";
        title.style.color = "#ff2a54";
        summary.innerHTML = `
            <p><strong>[!] CHUYÊN ÁN:</strong> ${activeCase.badge}</p>
            <p><strong>[!] NGUYÊN NHÂN:</strong> ${subtitleText}</p>
            <p><strong>[!] GỢI Ý CHIẾN THUẬT:</strong> Hãy luôn chạy công cụ phân tích trên CyberDeck (cột phải) trước khi trả lời tin nhắn gài bẫy!</p>
        `;
    }
}

// 9. SỰ KIỆN NÚT ĐIỀU KHIỂN CHUNG
document.getElementById('sfx-toggle').onclick = function() {
    sfxEnabled = !sfxEnabled;
    this.innerText = sfxEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
};

EL.abortBtn.onclick = () => {
    clearInterval(countdownTimer);
    EL.alarm.classList.add('hidden');
    EL.globalTimer.classList.add('hidden');
    EL.mgModal.classList.add('hidden');
    EL.abortBtn.classList.add('hidden');
    EL.playScreen.classList.remove('active');
    EL.playScreen.classList.add('hidden');
    EL.menuScreen.classList.remove('hidden');
    EL.menuScreen.classList.add('active');
};

document.getElementById('next-case-btn').onclick = () => {
    EL.resultScreen.classList.remove('active');
    EL.resultScreen.classList.add('hidden');
    EL.menuScreen.classList.remove('hidden');
    EL.menuScreen.classList.add('active');
};