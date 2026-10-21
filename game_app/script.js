/* ============================================================================
   SCAMBAITER v5.0 - 8 HANDCRAFTED SYNDICATE CASES + INFINITE CASE GENERATOR
   ============================================================================ */

let soundOn = true;
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function sfx(type) {
    if (!soundOn) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'chat') {
        osc.frequency.setValueAtTime(560, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.09);
        osc.start(now); osc.stop(now + 0.09);
    } else if (type === 'clue') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(780, now + 0.08);
        osc.frequency.setValueAtTime(1040, now + 0.16);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.linearRampToValueAtTime(190, now + 0.25);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
        osc.start(now); osc.stop(now + 0.28);
    }
}

// GENERATOR FACTORY ĐỂ XÂY DỰNG NHANH CÁC CHUYÊN ÁN ĐẦY ĐỦ 6 GIAI ĐOẠN & 4 TAB
function createCaseBlueprint(cfg) {
    return {
        id: cfg.id,
        code: cfg.code,
        category: cfg.category,
        diffClass: cfg.diffClass,
        diffLabel: cfg.diffLabel,
        shortTitle: cfg.shortTitle,
        shortDesc: cfg.shortDesc,
        bullets: cfg.bullets,
        title: `${cfg.code}: ${cfg.shortTitle.toUpperCase()}`,
        avatar: cfg.avatar,
        scamName: cfg.scamName,
        scamSub: cfg.scamSub,
        correctBoss: cfg.correctBoss,
        correctWeapon: cfg.correctWeapon,
        correctSector: cfg.correctSector,
        bossOptions: [
            { val: cfg.correctBoss, text: `Mật danh: ${cfg.correctBoss} (${cfg.bossRealName})` },
            { val: "wrong_boss_1", text: "Mật danh: NIGHT_CRAWLER (Nhóm cò rửa tiền tự do)" },
            { val: "wrong_boss_2", text: "Mật danh: PROXY_GHOST (Tin tặc đánh thuê Đông Âu)" }
        ],
        weaponOptions: [
            { val: cfg.correctWeapon, text: cfg.weaponText },
            { val: "wrong_weap_1", text: "Tấn công từ chối dịch vụ (DDoS) vào cổng thanh toán" },
            { val: "wrong_weap_2", text: "Phát tán virus qua USB vật lý tại quầy giao dịch" }
        ],
        geoClues: [
            `📡 Trạm thu phát sóng BTS: Định vị trên dải Hành lang ${cfg.correctSector[0]} (Hàng ${cfg.correctSector[0]}).`,
            `⚡ Trạm biến áp công suất lớn: Ghi nhận tại Phân khu số ${cfg.correctSector[1]} (Cột ${cfg.correctSector[1]}).`,
            `🌐 Điểm cuối đường truyền C2: Khớp 100% với ô lưới tọa độ ${cfg.correctSector}.`
        ],
        nodes: [
            { id: "n1", title: "1. Kênh Tiếp Cận Nạn Nhân", val: cfg.node1Val, detail: cfg.node1Det },
            { id: "n2", title: "2. Chữ Ký Trùm Cầm Đầu", val: `Alias: ${cfg.correctBoss}`, detail: `Trích xuất từ siêu dữ liệu mẫu vật số cho thấy kẻ điều phối mang mật danh ${cfg.correctBoss}.` },
            { id: "n3", title: "3. Cơ Chế Tấn Công Kỹ Thuật", val: cfg.correctWeapon, detail: cfg.weaponText },
            { id: "n4", title: "4. Gói Tin Rò Rỉ IP Thật", val: `IP: ${cfg.realIp}`, detail: "Bắt được qua mồi nhử Canary Token và trình bắt gói tin Wireshark." },
            { id: "n5", title: "5. Tài Khoản Rửa Tiền (Mule)", val: cfg.muleAccount, detail: "Tài khoản trung gian dùng để gom tiền nạn nhân trước khi tẩu tán qua tiền mã hóa." },
            { id: "n6", title: "6. Tọa Độ Sào Huyệt", val: `Sector ${cfg.correctSector}`, detail: `Tòa nhà điều hành đặt tại ô lưới ${cfg.correctSector}, nằm trong mạng lưới THE HYDRA.` }
        ],
        artifacts: [
            {
                id: `art_1_${cfg.id}`,
                name: cfg.art1Name,
                nodeUnlock: 1,
                lines: [
                    { text: `0x0010 | Header_Signature: Verified_Stream // Protocol_v2.4`, isClue: false },
                    { text: `0x0020 | [KINGPIN FOUND] Controller_Alias: '${cfg.correctBoss}' // Auth_Key: 0x99F`, isClue: true, msg: `Đã bóc trần mật danh kẻ cầm đầu chuyên án: ${cfg.correctBoss}!` },
                    { text: `0x0030 | Timestamp_UTC: Synchronized // Checksum: OK`, isClue: false }
                ]
            },
            {
                id: `art_2_${cfg.id}`,
                name: cfg.art2Name,
                nodeUnlock: 2,
                lines: [
                    { text: `0x1010 | Module_Init: Standard_UI_Wrapper // Memory_Alloc: 64MB`, isClue: false },
                    { text: `0x1020 | [EXPLOIT CORE] Vector: ${cfg.correctWeapon} -> Target_Grid: ${cfg.correctSector}`, isClue: true, msg: `Xác định vũ khí gây án (${cfg.correctWeapon}) và trạm hạ tầng tại Sector ${cfg.correctSector}!` },
                    { text: `0x1030 | C2_Relay_Host: ${cfg.realIp}:8443 // KeepAlive: True`, isClue: false }
                ]
            }
        ],
        impactLesson: cfg.impactLesson,
        stages: [
            {
                scam: cfg.stage1Scam,
                artifactDrop: `art_1_${cfg.id}`,
                choices: [
                    { text: cfg.stage1ReplyGood, greed: 22, susp: -5, next: 1, unlockNode: 0 },
                    { text: "Mấy trò lừa đảo rẻ tiền này tao lạ gì, biến đi!", greed: 0, susp: 100, next: -1 }
                ]
            },
            {
                scam: cfg.stage2Scam,
                artifactDrop: `art_2_${cfg.id}`,
                choices: [
                    { text: cfg.stage2ReplyGood, greed: 25, susp: 5, next: 2 }
                ]
            },
            {
                scam: cfg.stage3Scam,
                choices: [
                    { text: "Được rồi, để tôi gửi ảnh chụp màn hình biên lai / mã xác thực qua thanh công cụ cho bên bạn kiểm tra ngay nhé!", greed: 20, susp: 10, next: 3, hintBait: true, unlockNode: 4 }
                ]
            },
            {
                scam: "Nhanh lên! Gửi ngay ảnh chụp biên lai hoặc mã xác thực qua thanh công cụ để hệ thống bên tôi hoàn tất thủ tục trong 2 phút!",
                requireBait: true,
                choices: [
                    { text: "Tôi vừa bấm gửi tập tin xác nhận qua đó, bạn mở ra kiểm tra xem đã khớp lệnh chưa?", greed: 20, susp: 15, next: 4, unlockNode: 3 }
                ]
            },
            {
                scam: `Khoan đã... Tại sao tập tin mày vừa gửi lại kích hoạt cảnh báo rò rỉ IP (${cfg.realIp}) trên máy chủ của tụi tao?! Mày đang truy vết ngược bọn tao đấy à?!`,
                choices: [
                    { text: `Đúng vậy! Mật danh ${cfg.correctBoss} và toàn bộ sào huyệt tại Sector ${cfg.correctSector} đã bị Đội Trọng Án khóa mục tiêu!`, greed: 10, susp: 60, next: 5, unlockNode: 5 }
                ]
            },
            {
                isBossTwist: true,
                scam: `BÁO ĐỘNG ĐỎ TOÀN PHÂN KHU ${cfg.correctSector}!! Đặc vụ VN-CERT đã xâm nhập hệ thống! Kích hoạt tiến trình tự hủy máy chủ trong 35 giây!`,
                unlockNode: 5
            }
        ]
    };
}

// DANH SÁCH 8 CHUYÊN ÁN TRỌNG ĐIỂM
const CASES_DB = [
    createCaseBlueprint({
        id: 0, code: "HỒ SƠ #A01", category: "vn", diffClass: "med", diffLabel: "Mức độ: Nghiêm trọng",
        shortTitle: "👮 Bóng Ma Cảnh Sát (Giả Mạo VNeID)",
        shortDesc: "Giả danh Viện Kiểm Sát gửi lệnh bắt giữ giả và ép cài mã độc VNeID_Pro.apk chiếm quyền ngân hàng.",
        bullets: ["🔎 Giám định EXIF ảnh Lệnh bắt giữ", "🧬 Dịch ngược Trojan APK đọc trộm OTP", "📍 Tọa độ khu tự trị biên giới"],
        avatar: "👮", scamName: "Đại Úy Lê Minh (VKS Giả Mạo)", scamSub: "● Zalo Bảo Mật - Đang ghi âm",
        correctBoss: "PHANTOM_K9", bossRealName: "Trần Văn Hổ - Cầm đầu Khu B4",
        correctWeapon: "Trojan_GoldDigger_APK", weaponText: "Trojan VNeID_Pro.apk (Chiếm quyền Accessibility & Đọc trộm OTP)",
        correctSector: "B4", realIp: "103.114.98.42", muleAccount: "VCB 1029384756 (Cty Ma)",
        node1Val: "VoIP +84 919.xxx.442", node1Det: "Sử dụng tổng đài ảo VoIP giả số điện thoại cơ quan công an.",
        art1Name: "📄 Lenh_Bat_Giam_VKS.jpg (EXIF)", art2Name: "📦 VNeID_Pro_CongAn.apk (Decompile)",
        impactLesson: "Công an hay Viện Kiểm Sát KHÔNG BAO GIỜ làm việc qua Zalo, không gửi lệnh bắt qua mạng và tuyệt đối không yêu cầu cài file .APK ngoài luồng.",
        stage1Scam: "Thông báo khẩn từ Viện Kiểm Sát! Danh tính của gia đình bạn đang dính líu đến đường dây rửa tiền 4,2 tỷ đồng. Đây là Lệnh Bắt Tạm Giam có dấu đỏ, yêu cầu hợp tác kê khai tài sản ngay!",
        stage1ReplyGood: "(Soi ảnh ở Tab 2 Lab) Dạ chú ơi gia đình tôi có sổ tiết kiệm 2,5 tỷ dưỡng già, giờ phải làm sao để chứng minh tiền trong sạch ạ?",
        stage2Scam: "Muốn chứng minh tiền sạch, hãy tải ngay ứng dụng 'VNeID_Pro_CongAn.apk' này về điện thoại và cấp quyền Trợ Năng (Accessibility) để hệ thống quét tài khoản!",
        stage2ReplyGood: "(Dịch ngược APK ở Tab 2) Dạ tôi tải về rồi cán bộ ơi, bước tiếp theo phải chuyển khoản xác minh vào đâu ạ?",
        stage3Scam: "Chuyển ngay 2,5 tỷ vào Tài Khoản Tạm Giữ 1029384756 (VCB) rồi gửi ảnh biên lai qua đây để đình chỉ lệnh bắt!"
    }),
    createCaseBlueprint({
        id: 1, code: "HỒ SƠ #A02", category: "vn", diffClass: "hard", diffLabel: "Mức độ: Cao",
        shortTitle: "🎭 Mặt Nạ Nhân Tạo (AI Deepfake)",
        shortDesc: "Dùng AI ghép mặt và nhại giọng con cháu gọi video báo tin tai nạn nguy kịch để thúc ép chuyển 80 triệu viện phí.",
        bullets: ["🔎 Phân tích khung xương mặt DeepFaceLive", "🧬 Bóc tách tần số giọng nhân tạo RVC v2", "📍 Khoanh vùng xưởng GPU biên giới"],
        avatar: "🎭", scamName: "FB Người Thân (Bị Hack)", scamSub: "● Messenger - Luồng Video AI",
        correctBoss: "ECHO_MASTER", bossRealName: "Lý Cường - Trùm Xưởng Deepfake C2",
        correctWeapon: "DeepFaceLive_RVC_v2", weaponText: "DeepFaceLive + RVC v2 Voice Cloning qua OBS Virtual Cam",
        correctSector: "C2", realIp: "45.77.210.19", muleAccount: "TCB 8899112233 (TK Mồi)",
        node1Val: "FB Session Hijack", node1Det: "Đánh cắp Cookie trình duyệt qua link bình chọn giả mạo.",
        art1Name: "🎞️ Deepfake_Video_Stream.mp4", art2Name: "🎙️ Audio_CapCuu_RVC.wav",
        impactLesson: "Khi nhận cuộc gọi video báo tin tai nạn hoặc vay tiền gấp với hình ảnh mờ nhòe, hãy hỏi một 'Mật khẩu gia đình' hoặc cúp máy gọi thẳng vào số SIM di động.",
        stage1Scam: "[CUỘC GỌI VIDEO MỜ NHÒE 5 GIÂY] Cô chú ơi cứu con! Con bị tai nạn giao thông đang cấp cứu, bệnh viện bắt đóng 80 triệu mổ gấp ngay bây giờ!",
        stage1ReplyGood: "(Soi Video ở Tab 2 Lab) Trời ơi cháu đang ở bệnh viện nào thế? Sao sóng yếu hình mờ thế cháu?",
        stage2Scam: "Máy con vỡ camera rồi! Cô chú nghe tin nhắn thoại của bác sĩ đây này rồi chuyển gấp 80 triệu cứu con!",
        stage2ReplyGood: "(Soi phổ âm thanh ở Tab 2) Chú nghe rồi, đưa ngay số tài khoản viện phí đây để chú chuyển!",
        stage3Scam: "Chuyển 80 triệu vào STK 8899112233 (TCB) của bác sĩ trực rồi gửi ảnh biên lai xác nhận qua đây ngay nhé!"
    }),
    createCaseBlueprint({
        id: 2, code: "HỒ SƠ #A03", category: "au", diffClass: "extreme", diffLabel: "Mức độ: Cực đại",
        shortTitle: "💎 Mê Cung Kim Tiền (Sàn Crypto Ảo)",
        shortDesc: "Tuyển dụng làm nhiệm vụ 'chốt đơn hoàn tiền' kết hợp Smart Contract độc hại rút cạn ví USDT.",
        bullets: ["🔎 Dịch ngược Smart Contract rút ví", "🧬 Truy vết dòng tiền Tron Mixer", "📍 Phong tỏa ví lạnh 4,2 triệu USDT"],
        avatar: "💎", scamName: "Điều Phối Viên Sàn Quốc Tế", scamSub: "● Telegram VIP Group (1.200 Bots)",
        correctBoss: "VIPER_0x99", bossRealName: "Trương Vỹ - Trùm Sàn Ảo Khu D5",
        correctWeapon: "Unlimited_USDT_Drainer", weaponText: "Hợp đồng thông minh độc hại (Approve Unlimited USDT Drainer)",
        correctSector: "D5", realIp: "185.220.101.7", muleAccount: "Ví Tron: T9yD14Nj9...88xK",
        node1Val: "1.200 Bot Chim Mồi", node1Det: "Dùng tài khoản ảo tung hứng hóa đơn rút lãi giả trong nhóm Telegram.",
        art1Name: "📜 Claim_VIP_Reward.sol (Contract)", art2Name: "⛓️ TronScan_Mixer_Tx.log",
        impactLesson: "Không có việc nhẹ lương cao nào trả hoa hồng 20-30% mỗi ca. Tuyệt đối không ký xác nhận lệnh 'Approve Unlimited' trên các trang web tiền số lạ.",
        stage1Scam: "Chúc mừng bạn đã nhận 300k tiền thưởng nhiệm vụ đầu tiên! Mời bạn ký xác nhận Smart Contract VIP để nhận gói hoa hồng 45% trị giá 50.000 USDT!",
        stage1ReplyGood: "(Soi Smart Contract ở Tab 2) Tuyệt quá! Em đang có sẵn 50.000 USDT trong ví lạnh, cho em tham gia ngay!",
        stage2Scam: "Đây là nhật ký giao dịch Blockchain của sàn vừa trả thưởng sáng nay. Bạn kiểm tra rồi kết nối ví vào cổng VIP nhé!",
        stage2ReplyGood: "(Soi Blockchain ở Tab 2) Em thấy rồi, để em chuẩn bị xác thực kết nối ví ngay!",
        stage3Scam: "Hãy gửi ảnh chụp màn hình số dư ví hoặc mã OTP kết nối vào Ví Tổng T9yD14Nj9...88xK để hệ thống giải ngân!"
    }),
    createCaseBlueprint({
        id: 3, code: "HỒ SƠ #A04", category: "au", diffClass: "hard", diffLabel: "Mức độ: Cao",
        shortTitle: "💔 Bẫy Tình Viễn Xứ (Pig Butchering)",
        shortDesc: "Kịch bản 'Nuôi heo đất': Giả làm doanh nhân Việt kiều thành đạt tán tỉnh suốt nhiều tháng rồi dụ đầu tư sàn Vàng/Forex ảo.",
        bullets: ["🔎 Bóc trần ảnh AI & Hồ sơ LinkedIn giả", "🧬 Phân tích máy chủ MetaTrader5 giả mạo", "📍 Giải cứu nạn nhân trước khi cắm sổ đỏ"],
        avatar: "🥂", scamName: "David Nguyễn (CEO Đầu Tư)", scamSub: "● Tinder / WhatsApp Business",
        correctBoss: "CUPID_BLACK", bossRealName: "Mã Tư Viễn - Trùm Kịch Bản Tình Cảm A6",
        correctWeapon: "Fake_MT5_Trading_Server", weaponText: "Máy chủ MetaTrader5 giả mạo chỉnh sửa biểu đồ nến thủ công",
        correctSector: "A6", realIp: "119.28.55.104", muleAccount: "ACB 4455667788 (Cty XNK Á Châu)",
        node1Val: "Tinder Profile AI", node1Det: "Sử dụng ảnh người mẫu nam ghép AI và kịch bản tâm lý học thao túng tình cảm.",
        art1Name: "📸 Luxury_Lifestyle_Photo.heic", art2Name: "📈 MT5_Server_Config.json",
        impactLesson: "Cảnh giác tuyệt đối với những 'người yêu qua mạng' hoàn hảo chưa từng gặp mặt trực tiếp nhưng lại rủ rê góp vốn đầu tư tài chính, ngoại hối hoặc tiền ảo.",
        stage1Scam: "Em yêu à, tối nay anh vừa phân tích được nhịp sóng Vàng nội bộ. Anh gửi em bức ảnh anh đang ngồi ở phòng giao dịch Zurich này, tụi mình cùng vào lệnh thắng lớn để cuối năm mua biệt thự nhé!",
        stage1ReplyGood: "(Soi ảnh ở Tab 2 Lab) Anh giỏi quá! Em cũng vừa gom được 1,2 tỷ tiền tiết kiệm, vào lệnh ở sàn nào vậy anh?",
        stage2Scam: "Em tải file cấu hình sàn độc quyền 'MT5_Server_Config.json' này về máy nhé, anh dùng quyền cổ đông nội bộ đảm bảo lệnh của em thắng 100%!",
        stage2ReplyGood: "(Soi file cấu hình ở Tab 2) Em cài xong rồi anh ơi, giờ nạp vốn 1,2 tỷ vào đâu để kịp sóng tối nay ạ?",
        stage3Scam: "Em chuyển ngay 1,2 tỷ vào tài khoản đối tác thanh khoản ACB 4455667788 rồi gửi ảnh biên lai qua đây để anh kích hoạt đòn bẩy x10 cho em!"
    }),
    createCaseBlueprint({
        id: 4, code: "HỒ SƠ #A05", category: "vn", diffClass: "hard", diffLabel: "Mức độ: Cao",
        shortTitle: "🕸️ Độc Chiêu Tuyển Dụng (Bẫy Việc Làm)",
        shortDesc: "Mạo danh tập đoàn công nghệ lớn tuyển sinh viên mới ra trường lương 3.000 USD, dụ ký hợp đồng giả và lừa đưa qua biên giới.",
        bullets: ["🔎 Kiểm tra chữ ký số giả trên Offer Letter", "🧬 Bóc tách Bot Telegram thu thập CCCD", "📍 Chặn đứng xe trung chuyển tại cửa khẩu"],
        avatar: "💼", scamName: "HR Director - Global Tech Group", scamSub: "● LinkedIn / Telegram Tuyển Dụng",
        correctBoss: "HR_SPIDER", bossRealName: "Đặng Quốc Toàn - Trùm Buôn Người Khu D1",
        correctWeapon: "Telegram_WebHook_Phishing", weaponText: "Cổng tuyển dụng giả thu thập CCCD/Sinh trắc & Định vị GPS",
        correctSector: "D1", realIp: "27.72.100.88", muleAccount: "MBBank 9988776655 (Quỹ Bảo Lãnh)",
        node1Val: "Fake LinkedIn Recruiter", node1Det: "Giả mạo chuyên viên nhân sự của các tập đoàn lớn để tiếp cận sinh viên.",
        art1Name: "📑 Offer_Letter_3000USD.pdf", art2Name: "🤖 Onboarding_Bot_Script.js",
        impactLesson: "Không có doanh nghiệp uy tín nào phỏng vấn sơ sài qua Telegram, yêu cầu đóng 'tiền thế chân dự án' hoặc bố trí xe đón đi làm việc ở khu vực biên giới mập mờ.",
        stage1Scam: "Chúc mừng ứng viên! Hồ sơ của bạn đã trúng tuyển vị trí Kỹ sư Phần mềm Quốc tế với mức lương khởi điểm 3.200 USD/tháng. Xem ngay thư mời nhận việc 'Offer_Letter_3000USD.pdf' đính kèm!",
        stage1ReplyGood: "(Soi PDF ở Tab 2 Lab) Dạ em cảm ơn chị HR! Thủ tục nhận việc và ký hợp đồng cần chuẩn bị những gì ạ?",
        stage2Scam: "Do dự án bảo mật tại chi nhánh đặc khu, bạn hãy chạy script xác thực nhân sự 'Onboarding_Bot_Script.js' này và chuẩn bị lệ phí bảo lãnh thiết bị nhé!",
        stage2ReplyGood: "(Soi Script ở Tab 2) Dạ em đã chạy xác thực rồi, lệ phí bảo lãnh Macbook Pro công ty là bao nhiêu để em nộp luôn ạ?",
        stage3Scam: "Bạn nộp gấp 35 triệu phí bảo lãnh thiết bị và visa vào TK MBBank 9988776655 rồi gửi biên lai hoặc mã xác thực qua đây để xe công ty đón bạn ngay chiều nay!"
    }),
    createCaseBlueprint({
        id: 5, code: "HỒ SƠ #A06", category: "vn", diffClass: "med", diffLabel: "Mức độ: Phổ biến",
        shortTitle: "📦 Bưu Kiện Tử Thần (Giả Danh Shipper)",
        shortDesc: "Gọi điện báo có đơn hàng thu hộ, sau đó nói 'nhầm lẫn đăng ký Thẻ Hội Viên Giao Hàng Tự Động trừ 3,5 triệu/tháng' để dẫn dụ vào link hủy thẻ giả.",
        bullets: ["🔎 Soi dữ liệu rò rỉ từ nhãn đơn hàng", "🧬 Bóc tách trang WebView giả cổng Ngân hàng", "📍 Đánh sập tổng đài giả mạo Shipper"],
        avatar: "🛵", scamName: "Giao Hàng Nhanh 247 (Giả Mạo)", scamSub: "● Cuộc gọi di động / Zalo OA Giả",
        correctBoss: "GHOST_SHIP", bossRealName: "Phạm Văn Kiên - Trùm Kho Dữ Liệu B1",
        correctWeapon: "Phishing_WebView_Overlay", weaponText: "Trang web giả mạo cổng Hủy Thẻ Hội Viên đánh cắp tài khoản e-Banking",
        correctSector: "B1", realIp: "14.161.22.19", muleAccount: "VPBank 3344556677 (Cổng Thu Hộ Ảo)",
        node1Val: "Data Leak Đơn Hàng", node1Det: "Mua dữ liệu SĐT và địa chỉ người mua hàng từ các buổi livestream.",
        art1Name: "🏷️ Bill_Giao_Hang_Leak.csv", art2Name: "🌐 Huy_The_Hoi_Vien_Bank.html",
        impactLesson: "Khi shipper yêu cầu chuyển khoản trước khi thấy hàng, hoặc dọa bạn bị kích hoạt 'Gói hội viên trừ tiền hàng tháng' rồi gửi link hủy đăng ký, đó 100% là bẫy lừa đảo.",
        stage1Scam: "Alo anh/chị có đơn hàng mỹ phẩm 450k em để ở dưới sảnh nhé! Chuyển khoản gấp cho em để em chạy kịp ca! Đây là phiếu xuất kho 'Bill_Giao_Hang_Leak.csv' của anh/chị!",
        stage1ReplyGood: "(Soi CSV ở Tab 2 Lab) Ủa tôi vừa chuyển nhầm vào số đó rồi mà sao tổng đài báo kích hoạt gói Hội Viên VIP tự trừ 4,5 triệu/tháng vậy em?!",
        stage2Scam: "Chết rồi! Số tài khoản đó là số đăng ký Đại lý VIP! Anh/chị phải bấm ngay vào cổng 'Huy_The_Hoi_Vien_Bank.html' này đăng nhập ngân hàng để hủy tự động trừ tiền ngay!",
        stage2ReplyGood: "(Soi HTML ở Tab 2) Trời ơi anh/chị đăng nhập vào trang hủy thẻ rồi, giờ nó bắt xác nhận bước cuối như thế nào em?",
        stage3Scam: "Anh/chị nhập lệnh hoàn cọc vào TK VPBank 3344556677 và gửi ngay ảnh biên lai hoặc mã OTP qua thanh công cụ để hệ thống hủy trừ tiền hàng tháng nhé!"
    }),
    createCaseBlueprint({
        id: 6, code: "HỒ SƠ #A07", category: "au", diffClass: "hard", diffLabel: "Mức độ: Liên quốc gia",
        shortTitle: "🦘 Ác Mộng Du Học Sinh (ATO & Visa Scam)",
        shortDesc: "Bối cảnh Australia – Việt Nam: Giả danh Sở Thuế Úc (ATO) và Bộ Nội Vụ (Home Affairs) dọa hủy Visa du học sinh RMIT nếu không nộp phạt ngay.",
        bullets: ["🔎 Giám định SIP Trunk giả số +61 Cảnh sát Úc", "🧬 Truy vết cổng thanh toán Gift Card / Bitcoin", "📍 Phối hợp Cảnh sát Liên bang Úc (AFP) & VN-CERT"],
        avatar: "🇦🇺", scamName: "Officer Miller - Home Affairs / ATO", scamSub: "● Spoofed ID: +61 2 6264 xxxx",
        correctBoss: "AUSSIE_SPOOF", bossRealName: "Victor Trần - Trùm Đường Dây Xuyên Á C5",
        correctWeapon: "SIP_CallerID_Spoofing", weaponText: "Tổng đài SIP Trunk giả mạo đầu số Chính phủ Úc (+61) & Cổng phạt thuế ảo",
        correctSector: "C5", realIp: "103.56.112.9", muleAccount: "BSB 062-xxx // Crypto Bridge C5",
        node1Val: "Spoofed +61 Gov Number", node1Det: "Giả mạo số điện thoại hiển thị của Sở Thuế Australia (ATO) để hù dọa sinh viên quốc tế.",
        art1Name: "📋 ATO_Tax_Fraud_Warrant.pdf", art2Name: "📡 SIP_Trunk_Header.pcap",
        impactLesson: "Chính phủ Australia (ATO / Home Affairs) và các cơ quan nhà nước không bao giờ gọi điện đe dọa trục xuất ngay lập tức hoặc yêu cầu đóng tiền phạt qua tài khoản cá nhân, thẻ quà tặng hay Crypto.",
        stage1Scam: "[ENGLISH/VIETNAMESE INTERPRETER CALL] Đây là Bộ Nội Vụ & Sở Thuế Australia (ATO)! Mã số thuế TFN và Student Visa 500 của bạn bị phát hiện trốn thuế 18.500 AUD. Xem ngay lệnh trục xuất 'ATO_Tax_Fraud_Warrant.pdf'!",
        stage1ReplyGood: "(Soi PDF ở Tab 2 Lab) Dạ em là du học sinh mới sang học kỳ đầu, làm sao em trốn thuế được ạ? Xin đừng hủy Visa của em!",
        stage2Scam: "Cảnh sát Liên bang đang trên đường tới ký túc xá của bạn! Hãy kiểm tra gói tin định tuyến 'SIP_Trunk_Header.pcap' từ cổng Tòa án và nộp tiền bảo lãnh tại ngoại ngay!",
        stage2ReplyGood: "(Soi PCAP ở Tab 2) Dạ em sợ quá, bố mẹ em ở Việt Nam vừa gửi tiền học phí sang, giờ em phải nộp bảo lãnh vào đâu để không bị bắt ạ?",
        stage3Scam: "Chuyển ngay 18.500 AUD vào cổng ký quỹ BSB 062-xxx rồi gửi ảnh chụp biên lai hoặc mã OTP qua thanh công cụ để đình chỉ lệnh trục xuất!"
    }),
    createCaseBlueprint({
        id: 7, code: "HỒ SƠ #A08", category: "boss", diffClass: "extreme", diffLabel: "TRÙM CUỐI CHIẾN DỊCH",
        shortTitle: "💀 Đầu Não HYDRA (Tổng Trùm Liên Minh)",
        shortDesc: "Trận đánh cuối cùng: Xâm nhập hệ thống của ARCHON_OMEGA — kẻ cung cấp hạ tầng AI Deepfake, APK Malware và rửa tiền cho cả 7 đường dây trên!",
        bullets: ["🔎 Giải mã Kiến trúc Botnet Trung tâm", "🧬 Bóc tách Sổ cái Rửa tiền Đa quốc gia", "📍 Đột kích Pháo đài Ngầm Sector D6"],
        avatar: "💀", scamName: "ARCHON_OMEGA (The Hydra Architect)", scamSub: "● Darknet Encrypted Channel // Tor v3",
        correctBoss: "ARCHON_OMEGA", bossRealName: "Trùm Cuối Liên Minh Tội Phạm HYDRA D6",
        correctWeapon: "Hydra_AI_Crime_SaaS", weaponText: "Nền tảng Crime-as-a-Service cung cấp trọn gói Deepfake, RAT APK & Rửa tiền tự động",
        correctSector: "D6", realIp: "198.51.100.254", muleAccount: "Hydra Master Vault (88M USDT)",
        node1Val: "Darknet Crime-as-a-Service", node1Det: "Cho thuê hạ tầng lừa đảo trọn gói cho hàng trăm băng nhóm nhỏ lẻ khắp Đông Nam Á.",
        art1Name: "🧠 Hydra_Core_Architecture.bin", art2Name: "🏦 Master_Syndicate_Ledger.dat",
        impactLesson: "Tội phạm mạng hiện đại vận hành như những tập đoàn công nghệ ngầm (Crime-as-a-Service). Sự cảnh giác của mỗi cá nhân kết hợp cùng tri thức An ninh mạng của thế hệ trẻ chính là lá chắn vững chắc nhất bảo vệ cộng đồng.",
        stage1Scam: "Khá khen cho ngươi, Điều tra viên VN-CERT! Ngươi đã lần lượt bẻ gãy các nhánh chân rết của ta. Nhưng ngươi có dám nhìn vào lõi kiến trúc 'Hydra_Core_Architecture.bin' của ta không?",
        stage1ReplyGood: "(Soi Core Bin ở Tab 2 Lab) Ta đang giả làm một đại lý muốn thuê hạ tầng lừa đảo cấp VIP của ngươi đây, gửi bảng giá và sổ cái cho ta xem!",
        stage2Scam: "Muốn thuê hạ tầng Botnet & AI Deepfake cấp độ S của HYDRA à? Xem sổ cái 'Master_Syndicate_Ledger.dat' này để biết quy mô 88 triệu USDT của bọn ta!",
        stage2ReplyGood: "(Soi Sổ cái ở Tab 2) Hệ thống của ngươi ấn tượng đấy! Ta muốn đặt cọc 500.000 USDT để mở 10 phân khu mới, giao dịch thế nào?",
        stage3Scam: "Chuyển 500.000 USDT vào Hydra Master Vault và gửi ngay biên lai xác nhận hoặc mã khóa qua thanh công cụ để ta cấp quyền truy cập Root!"
    })
];

// 3. TRÌNH TẠO ÁN ĐỘNG VÔ TẬN (PROCEDURAL INFINITE CASE GENERATOR)
let proceduralCounter = 9;
function generateProceduralCase() {
    sfx('clue');
    const bosses = ["SHADOW_LYNX", "CRIMSON_BYTE", "VENOM_RAT", "LOTUS_KING", "COBALT_WOLF", "NEON_JACKAL"];
    const avatars = ["🕵️", "🦊", "🐍", "⚡", "🎭", "☣️"];
    const sectors = ["A1", "A3", "A5", "B2", "B5", "C1", "C4", "C6", "D2", "D4"];
    const scams = [
        {
            title: "Giả Mạo Nhân Viên Điện Lực (EVN) Cắt Điện",
            weapCode: "EVN_Fake_App_RAT",
            weapText: "Ứng dụng CSKH Điện lực giả mạo chiếm quyền đọc SMS OTP",
            s1: "Thông báo từ Tổng Công ty Điện lực! Hộ gia đình bạn đang nợ tiền điện quá hạn và sẽ bị cắt điện sau 30 phút nếu không cập nhật thanh toán trực tuyến!",
            s2: "Hãy tải ngay biên bản đối soát công tơ điện tử và cài đặt tiện ích thanh toán tự động đính kèm!",
            s3: "Chuyển khoản thanh toán vào tài khoản thu hộ trung gian rồi gửi ảnh biên lai hoặc mã OTP qua thanh công cụ ngay!"
        },
        {
            title: "Lừa Đảo Khóa SIM Chuẩn Hóa Thông Tin Thuê Bao",
            weapCode: "SS7_OTA_Phishing_Link",
            weapText: "Cổng chuẩn hóa thông tin thuê bao giả mạo đánh cắp eKYC & Ngân hàng",
            s1: "Cục Viễn thông thông báo: Số điện thoại của quý khách sẽ bị khóa 2 chiều sau 1 giờ nữa do chưa đồng bộ dữ liệu Căn cước công dân!",
            s2: "Quý khách hãy mở biểu mẫu kỹ thuật số đính kèm để cập nhật ảnh chụp sinh trắc học và liên kết tài khoản chính chủ!",
            s3: "Vui lòng gửi mã OTP xác nhận hoặc ảnh chụp biên lai phí duy trì sim qua thanh công cụ để hoàn tất giữ số!"
        },
        {
            title: "BẫyVé Máy Bay & Combo Du Lịch Giá Rẻ",
            weapCode: "Booking_Refund_Trojan",
            weapText: "Cổng hoàn tiền vé máy bay giả mạo chiếm đoạt hạn mức thẻ tín dụng",
            s1: "Đại lý Hàng không thông báo: Chuyến bay của quý khách bị hoãn, quý khách được bồi thường 3,5 triệu đồng tiền bảo hiểm trễ chuyến!",
            s2: "Vui lòng kiểm tra chứng từ hoàn vé điện tử đính kèm và truy cập cổng nhận tiền bồi thường tự động!",
            s3: "Hãy gửi ảnh chụp màn hình xác nhận hoặc mã OTP qua thanh công cụ để kế toán giải ngân tiền bồi thường ngay!"
        }
    ];

    const pickBoss = bosses[Math.floor(Math.random() * bosses.length)];
    const pickAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const pickSector = sectors[Math.floor(Math.random() * sectors.length)];
    const pickScam = scams[Math.floor(Math.random() * scams.length)];
    const randIp = `${Math.floor(Math.random()*180)+20}.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}`;
    const codeStr = `ÁN KHẨN #${proceduralCounter++}`;

    const procCase = createCaseBlueprint({
        id: 999,
        code: codeStr,
        category: "vn",
        diffClass: "extreme",
        diffLabel: "Án Động Thời Gian Thực",
        shortTitle: `${pickAvatar} ${pickScam.title}`,
        shortDesc: "Vụ án vừa tiếp nhận tức thời từ Đường dây nóng An ninh mạng 113.",
        bullets: ["🔎 Dữ liệu sinh ngẫu nhiên mỗi lượt", "🧬 Truy vết trùm cầm đầu mới", `📍 Tọa độ ẩn trong lưới A1-D6`],
        avatar: pickAvatar,
        scamName: `Đối Tượng Khẩn (${codeStr})`,
        scamSub: "● Đường dây nóng 113 đang giám sát trực tiếp",
        correctBoss: pickBoss,
        bossRealName: `Cầm đầu phân nhánh tại Sector ${pickSector}`,
        correctWeapon: pickScam.weapCode,
        weaponText: pickScam.weapText,
        correctSector: pickSector,
        realIp: randIp,
        muleAccount: `Mule_Bank_${Math.floor(100000 + Math.random()*900000)}`,
        node1Val: "Spoofed Hotline Call",
        node1Det: "Cuộc gọi tự động phát tán hàng loạt từ tổng đài ảo xuyên biên giới.",
        art1Name: `📄 Ho_So_Gia_Mao_${codeStr.replace('#','')}.dat`,
        art2Name: `📦 Payload_Phan_Tich_${pickSector}.bin`,
        impactLesson: "Tội phạm mạng liên tục thay đổi kịch bản mỗi ngày (từ điện lực, khóa SIM, hoàn tiền vé máy bay đến giả danh cơ quan nhà nước). Nguyên tắc vàng: Không bấm link lạ, không cài file lạ và không cung cấp OTP dưới mọi hình thức!",
        stage1Scam: pickScam.s1,
        stage1ReplyGood: "(Sau khi soi mẫu vật 1 ở Tab 2 Lab) Dạ tôi vừa kiểm tra thông báo rồi, bây giờ tôi phải làm thủ tục gì để không bị khóa dịch vụ ạ?",
        stage2Scam: pickScam.s2,
        stage2ReplyGood: "(Sau khi soi mẫu vật 2 ở Tab 2 Lab) Tôi đã mở biểu mẫu rồi, bước xác nhận tài khoản tiếp theo làm thế nào ạ?",
        stage3Scam: pickScam.s3
    });

    launchCaseInstance(procCase);
}

// 4. QUẢN LÝ DANH SÁCH CHUYÊN ÁN & CẤP BẬC NGƯỜI CHƠI
let solvedCaseIds = new Set();
let currentFilter = 'all';

function renderMenuCases(filter = 'all') {
    currentFilter = filter;
    const container = document.getElementById('case-list-container');
    container.innerHTML = '';

    const filtered = CASES_DB.filter(c => filter === 'all' || c.category === filter);
    filtered.forEach(c => {
        const isSolved = solvedCaseIds.has(c.id);
        const card = document.createElement('div');
        card.className = 'case-item' + (isSolved ? ' solved-card' : '');
        card.onclick = () => launchCaseInstance(c);
        card.innerHTML = `
            <div class="case-top">
                <span class="badge-code">${c.code} ${isSolved ? '✅ ĐÃ PHÁ' : ''}</span>
                <span class="badge-diff ${c.diffClass}">${c.diffLabel}</span>
            </div>
            <h3>${c.shortTitle}</h3>
            <p>${c.shortDesc}</p>
            <ul class="case-objectives">
                ${c.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <button class="start-case-btn">${isSolved ? 'ĐIỀU TRA LẠI CHUYÊN ÁN' : 'MỞ HỒ SƠ ĐIỀU TRA'}</button>
        `;
        container.appendChild(card);
    });
}

function filterCases(cat, btnEl) {
    sfx('chat');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderMenuCases(cat);
}

function updateRankBadge() {
    const count = solvedCaseIds.size;
    let rankTitle = "ĐIỀU TRA VIÊN SƠ CẤP";
    if (count >= 2) rankTitle = "CHUYÊN VIÊN PHÁP Y SỐ";
    if (count >= 5) rankTitle = "ĐỘI TRƯỞNG ĐẶC NHIỆM SOC";
    if (count >= 8) rankTitle = "CHỈ HUY TRƯỞNG VN-CERT 🏆";
    document.getElementById('agent-rank').innerText = `CẤP BẬC: ${rankTitle} (${count}/8 ÁN)`;
}

// 5. TRẠNG THÁI CHUYÊN ÁN ĐANG CHẠY
let curCase = null;
let curStage = 0;
let hp = 100;
let greed = 20;
let susp = 10;
let unlockedNodes = new Set();
let unlockedArtifacts = [];
let inspectedClues = new Set();
let selectedSector = null;
let baitSentInStage = false;
let packetInterval = null;
let raidTimer = null;
let secLeft = 35;

function launchCaseInstance(caseObj) {
    sfx('clue');
    curCase = caseObj;
    curStage = 0;
    hp = 100;
    greed = 20;
    susp = 10;
    unlockedNodes.clear();
    unlockedArtifacts = [];
    inspectedClues.clear();
    selectedSector = null;
    baitSentInStage = false;

    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('play-screen').classList.remove('hidden');
    document.getElementById('play-screen').classList.add('active');
    document.getElementById('menu-return-btn').classList.remove('hidden');

    document.getElementById('hud-case-name').innerText = curCase.title;
    document.getElementById('target-avatar').innerText = curCase.avatar;
    document.getElementById('target-name').innerText = curCase.scamName;
    document.getElementById('target-sub').innerText = curCase.scamSub;

    document.getElementById('chat-stream').innerHTML = '';
    document.getElementById('term-output').innerHTML = '';
    document.getElementById('raw-hex-viewer').innerHTML = '<p class="empty-lab">Hãy chọn một mẫu vật phía trên để tiến hành giám định pháp y số.</p>';

    initForensicWorkbench();
    startPacketSniffer();
    updateStatusHUD();

    termLog(`> Khởi tạo chuyên án: ${curCase.title}`, 't-info');
    termLog(`> Nhiệm vụ: Khai thác 6 giai đoạn, soi mẫu vật ở Phòng Lab (Tab 2), ghim tọa độ vệ tinh (Tab 3) và phát lệnh đột kích (Tab 4).`);

    switchTab('tab-graph');
    loadStage(0);
}

function initForensicWorkbench() {
    renderNodeGraph();
    document.getElementById('artifact-selector').innerHTML = '';

    const clueList = document.getElementById('geo-clues-list');
    clueList.innerHTML = '';
    curCase.geoClues.forEach(c => {
        const li = document.createElement('li');
        li.innerText = c;
        clueList.appendChild(li);
    });

    const grid = document.getElementById('sector-grid');
    grid.innerHTML = '';
    const rows = ['A', 'B', 'C', 'D'];
    for (let r = 0; r < 4; r++) {
        for (let c = 1; c <= 6; c++) {
            const code = `${rows[r]}${c}`;
            const cell = document.createElement('div');
            cell.className = 'sector-cell';
            cell.innerHTML = `<strong>${code}</strong><small>GRID</small>`;
            cell.onclick = () => selectMapSector(code, cell);
            grid.appendChild(cell);
        }
    }
    document.getElementById('selected-sector-label').innerText = "CHƯA CHỌN";

    const bossSel = document.getElementById('w-boss');
    bossSel.innerHTML = '<option value="">-- Chọn Mật danh Kẻ cầm đầu --</option>';
    curCase.bossOptions.forEach(o => {
        bossSel.innerHTML += `<option value="${o.val}">${o.text}</option>`;
    });

    const weapSel = document.getElementById('w-weapon');
    weapSel.innerHTML = '<option value="">-- Chọn Vũ khí kỹ thuật / Kênh rửa tiền --</option>';
    curCase.weaponOptions.forEach(o => {
        weapSel.innerHTML += `<option value="${o.val}">${o.text}</option>`;
    });

    document.getElementById('w-sector').value = "Chưa khóa tọa độ ở Tab 3";

    const qBox = document.getElementById('quick-cmds');
    qBox.innerHTML = '';
    ['scan_network', 'trace_hop', 'decrypt_logs', 'status'].forEach(cmd => {
        const b = document.createElement('button');
        b.className = 'q-cmd';
        b.innerText = cmd;
        b.onclick = () => runTerminalCmd(cmd);
        qBox.appendChild(b);
    });
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
    });
    document.querySelectorAll('.f-tab').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(tabId);
    target.classList.remove('hidden');
    target.classList.add('active');

    const mapBtn = { 'tab-graph': 0, 'tab-lab': 1, 'tab-map': 2, 'tab-warrant': 3 };
    document.querySelectorAll('.f-tab')[mapBtn[tabId]].classList.add('active');

    if (tabId === 'tab-lab') document.getElementById('lab-badge').classList.add('hidden');
    if (tabId === 'tab-map') document.getElementById('map-badge').classList.add('hidden');
    if (tabId === 'tab-warrant') document.getElementById('warrant-badge').classList.add('hidden');
}

function renderNodeGraph() {
    const box = document.getElementById('node-chain-grid');
    box.innerHTML = '';
    curCase.nodes.forEach((n, idx) => {
        const isOpen = unlockedNodes.has(idx);
        const div = document.createElement('div');
        div.className = 'chain-node' + (isOpen ? ' unlocked' : '');
        div.innerHTML = `
            <span class="n-step">MẮT XÍCH #0${idx + 1}</span>
            <h4>${n.title}</h4>
            <p>${isOpen ? n.val : '🔒 Đang ẩn danh'}</p>
        `;
        div.onclick = () => {
            if (isOpen) {
                sfx('chat');
                document.getElementById('node-detail-text').innerText = `[${n.title}] -> ${n.detail}`;
            } else {
                document.getElementById('node-detail-text').innerText = `Mắt xích này chưa mở. Hãy tiếp tục đối thoại và soi mẫu vật ở Phòng Lab (Tab 2).`;
            }
        };
        box.appendChild(div);
    });
}

function unlockChainNode(idx) {
    if (idx === undefined || idx === null) return;
    if (!unlockedNodes.has(idx)) {
        unlockedNodes.add(idx);
        sfx('clue');
        renderNodeGraph();
        updateStatusHUD();
        termLog(`> [LINK GRAPH] Đã mở khóa Mắt xích #0${idx + 1}: ${curCase.nodes[idx].title}!`, 't-info');
    }
}

function dropArtifactToLab(artId) {
    const art = curCase.artifacts.find(a => a.id === artId);
    if (!art || unlockedArtifacts.includes(artId)) return;
    unlockedArtifacts.push(artId);

    document.getElementById('lab-badge').classList.remove('hidden');
    addChatBubble('artifact-msg', `🔬 MẪU VẬT MỚI ĐÃ CHUYỂN VÀO PHÒNG LAB (TAB 2): ${art.name}`);
    termLog(`> [ARTIFACT CAPTURED] Mẫu vật '${art.name}' đã sẵn sàng tại Tab 2 (Phòng Lab Pháp Y).`, 't-warn');

    renderArtifactPills();
    openArtifactInLab(art);
}

function renderArtifactPills() {
    const sel = document.getElementById('artifact-selector');
    sel.innerHTML = '';
    unlockedArtifacts.forEach(id => {
        const art = curCase.artifacts.find(a => a.id === id);
        const btn = document.createElement('button');
        btn.className = 'art-pill';
        btn.innerText = art.name;
        btn.onclick = () => openArtifactInLab(art);
        sel.appendChild(btn);
    });
}

function openArtifactInLab(art) {
    const viewer = document.getElementById('raw-hex-viewer');
    viewer.innerHTML = `<p style="color:#00e5ff; margin-bottom:6px;">=== ĐANG PHÂN TÍCH MẪU VẬT: ${art.name} (CLICK DÒNG CHỨA MẬT DANH TRÙM / VŨ KHÍ) ===</p>`;
    art.lines.forEach((line, lIdx) => {
        const key = `${art.id}_${lIdx}`;
        const row = document.createElement('div');
        row.className = 'hex-line' + (inspectedClues.has(key) ? ' clue-found' : '');
        row.innerText = line.text;
        row.onclick = () => {
            if (line.isClue) {
                if (!inspectedClues.has(key)) {
                    inspectedClues.add(key);
                    row.classList.add('clue-found');
                    sfx('clue');
                    termLog(`> [FORENSIC HIT] ${line.msg}`, 't-info');
                    unlockChainNode(art.nodeUnlock);
                    document.getElementById('map-badge').classList.remove('hidden');
                }
            } else {
                row.classList.add('wrong-line');
                sfx('alert');
                termLog(`> [LAB] Dòng dữ liệu này là thông số tiêu chuẩn, hãy click dòng có dấu hiệu bất thường!`, 't-warn');
            }
        };
        viewer.appendChild(row);
    });
}

function selectMapSector(code, cellEl) {
    sfx('chat');
    document.querySelectorAll('.sector-cell').forEach(c => c.classList.remove('selected'));
    cellEl.classList.add('selected');
    selectedSector = code;
    document.getElementById('selected-sector-label').innerText = `SECTOR ${code}`;
    document.getElementById('w-sector').value = code;
    termLog(`> [GEO-GRID] Đã khóa tọa độ mục tiêu tại ô lưới: ${code}.`, 't-info');
}

function deployBait(baitType) {
    sfx('clue');
    baitSentInStage = true;
    const names = {
        'canary_img': '📸 [Đã gửi tập tin: Bien_Lai_Chuyen_Khoan.jpg (Gắn Canary IP Tracker)]',
        'fake_otp': '🔑 [Đã gửi tin nhắn: Mã SmartOTP xác thực là 849201]',
        'voice_clone': '🎙️ [Đã phát bản ghi âm giả giọng nạn nhân đang làm theo hướng dẫn]'
    };
    addChatBubble('player', names[baitType]);
    greed = Math.min(100, greed + 15);
    susp = Math.max(0, susp - 10);
    unlockChainNode(3);
    updateStatusHUD();
    termLog(`> [BAIT TRIGGERED] Đối tượng đã cắn câu mồi nhử! Bắt được IP thật đằng sau lớp Proxy.`, 't-info');
}

function loadStage(idx) {
    curStage = idx;
    baitSentInStage = false;
    const st = curCase.stages[idx];
    document.getElementById('stage-indicator').innerText = `GĐ ${idx + 1}/${curCase.stages.length}`;
    document.getElementById('dialogue-choices').innerHTML = '';
    document.getElementById('typing-box').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('typing-box').classList.add('hidden');
        addChatBubble(st.isBossTwist ? 'twist-msg' : 'scam', st.scam);

        if (st.unlockNode !== undefined) unlockChainNode(st.unlockNode);
        if (st.artifactDrop) dropArtifactToLab(st.artifactDrop);

        if (st.isBossTwist) {
            triggerFinalBossAttack();
            return;
        }

        if (st.hintBait) {
            termLog(`> [CHIẾN THUẬT] Ở bước tiếp theo, hãy bấm 1 nút trên thanh 'KHO MỒI NHỬ NGỤY TRANG' trước khi trả lời!`, 't-warn');
        }

        renderStageChoices(st);
    }, 750);
}

function renderStageChoices(st) {
    const box = document.getElementById('dialogue-choices');
    box.innerHTML = '';
    if (!st.choices) return;

    st.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'd-btn';
        btn.innerText = c.text;
        btn.onclick = () => {
            if (st.requireBait && !baitSentInStage) {
                sfx('alert');
                termLog(`> [CHẶN] Hãy bấm tung 1 'Mồi Nhử Ngụy Trang' (Ảnh Biên Lai Bẫy IP / Mã OTP Mồi) trên thanh công cụ điện thoại trước!`, 't-err');
                return;
            }
            addChatBubble('player', c.text);
            greed = Math.min(100, Math.max(0, greed + c.greed));
            susp = Math.min(100, Math.max(0, susp + c.susp));
            if (c.unlockNode !== undefined) unlockChainNode(c.unlockNode);
            updateStatusHUD();

            if (c.next === -1) {
                finishInvestigation(false, "Bứt dây động rừng! Đối tượng đã xóa tài khoản và hủy toàn bộ dấu vết.");
            } else {
                loadStage(c.next);
            }
        };
        box.appendChild(btn);
    });
}

function addChatBubble(cls, text) {
    sfx(cls === 'twist-msg' ? 'alert' : 'chat');
    const stream = document.getElementById('chat-stream');
    const div = document.createElement('div');
    div.className = `bubble ${cls}`;
    div.innerText = text;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
}

function startPacketSniffer() {
    clearInterval(packetInterval);
    const box = document.getElementById('packet-stream');
    box.innerHTML = '';

    const normalPkts = [
        "TCP 443 -> TLSv1.3 Encrypted Frame [ACK]",
        "UDP 53  -> DNS Standard Query Gateway",
        "ICMP    -> Echo Ping Reply ttl=54"
    ];
    const threatPkts = [
        "🚨 [WEBRTC_LEAK] Peer Real IP Exposed -> CLICK BẮT!",
        "🚨 [C2_BEACON] Malware Outbound Port 8443 -> CLICK BẮT!",
        "🚨 [MULE_API] Shadow Banking Hook Detected -> CLICK BẮT!"
    ];

    packetInterval = setInterval(() => {
        const isThreat = Math.random() < 0.34;
        const row = document.createElement('div');
        if (isThreat) {
            row.className = 'pkt-row suspicious';
            row.innerText = threatPkts[Math.floor(Math.random() * threatPkts.length)];
            row.onclick = function() {
                if (this.classList.contains('captured')) return;
                this.classList.remove('suspicious');
                this.classList.add('captured');
                this.innerText = "✅ [CAPTURED] Đã trích xuất gói tin mạng độc hại";
                sfx('clue');
                unlockChainNode(3);
            };
        } else {
            row.className = 'pkt-row';
            row.innerText = normalPkts[Math.floor(Math.random() * normalPkts.length)];
        }
        box.prepend(row);
        if (box.children.length > 16) box.removeChild(box.lastChild);
    }, 1800);
}

function runTerminalCmd(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    sfx('chat');
    termLog(`root@vncert:~# ${cmd}`, 't-info');
    document.getElementById('term-input').value = '';

    if (cmd === 'scan_network') {
        termLog(`> Quét mạng hoàn tất: Mở Tab 2 (Phòng Lab) và click vào dòng chữ có [KINGPIN FOUND] / [EXPLOIT CORE].`);
    } else if (cmd === 'trace_hop') {
        termLog(`> Tọa độ mục tiêu (Tab 3): ${curCase.geoClues.join(' // ')}`, 't-warn');
        document.getElementById('map-badge').classList.remove('hidden');
    } else if (cmd === 'decrypt_logs') {
        unlockChainNode(1);
        unlockChainNode(2);
        termLog(`> Đã giải mã nhanh 2 mắt xích kỹ thuật của đối tượng!`);
    } else if (cmd === 'status') {
        termLog(`> Mắt xích: ${unlockedNodes.size}/6 | Tọa độ đang ghim: ${selectedSector || 'Chưa chọn'}`);
    } else {
        termLog(`> Lệnh hỗ trợ: scan_network, trace_hop, decrypt_logs, status`, 't-warn');
    }
}

document.getElementById('term-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') runTerminalCmd(e.target.value);
});

function termLog(msg, cls = '') {
    const out = document.getElementById('term-output');
    const p = document.createElement('p');
    p.innerText = msg;
    if (cls) p.className = cls;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
}

function updateStatusHUD() {
    document.getElementById('hp-text').innerText = `${hp}%`;
    document.getElementById('hp-fill').style.width = `${hp}%`;
    document.getElementById('trace-text').innerText = `${unlockedNodes.size}/6`;
    document.getElementById('trace-fill').style.width = `${(unlockedNodes.size / 6) * 100}%`;

    document.getElementById('greed-num').innerText = `${greed}%`;
    document.getElementById('greed-bar').style.width = `${greed}%`;
    document.getElementById('susp-num').innerText = `${susp}%`;
    document.getElementById('susp-bar').style.width = `${susp}%`;
}

function triggerFinalBossAttack() {
    sfx('alert');
    document.getElementById('alarm-overlay').classList.remove('hidden');
    document.getElementById('raid-timer').classList.remove('hidden');
    document.getElementById('boss-modal').classList.remove('hidden');

    const arena = document.getElementById('boss-arena');
    arena.innerHTML = '';
    let nodesLeft = 6;

    for (let i = 0; i < nodesLeft; i++) {
        const n = document.createElement('div');
        n.className = 'wipe-node';
        n.innerText = `☣️ WIPE_DB_0${i + 1}.sh`;
        n.style.top = (Math.random() * 72 + 10) + '%';
        n.style.left = (Math.random() * 68 + 8) + '%';
        n.onclick = function() {
            sfx('clue');
            this.remove();
            nodesLeft--;
            if (nodesLeft === 0) {
                document.getElementById('boss-modal').classList.add('hidden');
                document.getElementById('warrant-badge').classList.remove('hidden');
                termLog(`> [COUNTER-HACK BLOCKED] Đã chặn đứng tiến trình xóa dữ liệu của trùm cuối!`, 't-info');
                termLog(`> [BƯỚC CUỐI] Hãy ghim ô tọa độ ở Tab 3 và ký Lệnh Đột Kích ở Tab 4 ngay!`, 't-warn');
                switchTab('tab-warrant');
            }
        };
        arena.appendChild(n);
    }

    secLeft = 35;
    document.getElementById('timer-sec').innerText = secLeft;
    clearInterval(raidTimer);
    raidTimer = setInterval(() => {
        secLeft--;
        hp = Math.max(10, hp - 2);
        updateStatusHUD();
        document.getElementById('timer-sec').innerText = secLeft;
        if (secLeft <= 0) {
            clearInterval(raidTimer);
            finishInvestigation(false, "Hết thời gian! Tổ chức tội phạm đã kịp xóa sạch ổ cứng máy chủ.");
        }
    }, 1000);
}

function submitArrestWarrant() {
    const bossVal = document.getElementById('w-boss').value;
    const weapVal = document.getElementById('w-weapon').value;

    if (!bossVal || !weapVal || !selectedSector) {
        sfx('alert');
        termLog(`> [THIẾU THÔNG TIN] Hãy chọn đủ Kẻ cầm đầu, Vũ khí gây án và ghim 1 Ô tọa độ bên Tab 3 (Định vị vệ tinh)!`, 't-err');
        return;
    }

    const isBossOk = (bossVal === curCase.correctBoss);
    const isWeapOk = (weapVal === curCase.correctWeapon);
    const isSectorOk = (selectedSector === curCase.correctSector);

    if (isBossOk && isWeapOk && isSectorOk) {
        for (let i = 0; i < 6; i++) unlockedNodes.add(i);
        if (curCase.id < 100) solvedCaseIds.add(curCase.id);
        updateRankBadge();
        finishInvestigation(true, `Lực lượng Phối hợp Quốc tế đã đột kích chính xác tòa nhà tại ô tọa độ ${selectedSector}, bắt giữ trùm ${curCase.correctBoss} và thu giữ toàn bộ tang vật!`);
    } else {
        let errs = [];
        if (!isBossOk) errs.push(`Sai Mật danh trùm (Đáp án trong Lab Tab 2 là ${curCase.correctBoss})`);
        if (!isWeapOk) errs.push("Sai Vũ khí kỹ thuật chính");
        if (!isSectorOk) errs.push(`Sai Tọa độ vệ tinh (Hãy chọn ô ${curCase.correctSector} ở Tab 3)`);
        sfx('alert');
        hp = Math.max(5, hp - 15);
        updateStatusHUD();
        termLog(`> [SAI LỆCH MỤC TIÊU] ${errs.join(' // ')}`, 't-err');
    }
}

function finishInvestigation(isWin, reasonText) {
    clearInterval(raidTimer);
    clearInterval(packetInterval);
    document.getElementById('alarm-overlay').classList.add('hidden');
    document.getElementById('raid-timer').classList.add('hidden');
    document.getElementById('boss-modal').classList.add('hidden');
    document.getElementById('menu-return-btn').classList.add('hidden');

    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('play-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('active');

    sfx(isWin ? 'clue' : 'alert');

    const stamp = document.getElementById('report-stamp');
    const title = document.getElementById('report-title');
    const grid = document.getElementById('report-grid');

    document.getElementById('report-sub').innerText = reasonText;
    document.getElementById('report-impact').innerText = curCase.impactLesson;

    if (isWin) {
        stamp.innerText = "CHUYÊN ÁN THÀNH CÔNG // ĐỘT KÍCH CHÍNH XÁC 100%";
        stamp.style.borderColor = "#00f59b";
        stamp.style.color = "#00f59b";
        title.innerText = "TRIỆT PHÁ ĐƯỜNG DÂY TỘI PHẠM!";
        title.style.color = "#00f59b";
        grid.innerHTML = curCase.nodes.map(n => `<p>✅ <strong>${n.title}:</strong> ${n.val} — <em>${n.detail}</em></p>`).join('');
    } else {
        stamp.innerText = "CHUYÊN ÁN THẤT BẠI // MỤC TIÊU TẨU THOÁT";
        stamp.style.borderColor = "#ff2a54";
        stamp.style.color = "#ff2a54";
        title.innerText = "ĐỐI TƯỢNG ĐÃ XÓA DẤU VẾT!";
        title.style.color = "#ff2a54";
        grid.innerHTML = `
            <p>❌ <strong>Nguyên nhân:</strong> ${reasonText}</p>
            <p>💡 <strong>Hồ sơ giải mã chuẩn của vụ này:</strong> Trùm <code>${curCase.correctBoss}</code> | Vũ khí: <code>${curCase.weaponText}</code> | Tọa độ vệ tinh: <code>${curCase.correctSector}</code>.</p>
        `;
    }
}

function returnToMenu() {
    clearInterval(raidTimer);
    clearInterval(packetInterval);
    document.getElementById('alarm-overlay').classList.add('hidden');
    document.getElementById('raid-timer').classList.add('hidden');
    document.getElementById('boss-modal').classList.add('hidden');
    document.getElementById('menu-return-btn').classList.add('hidden');

    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('play-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
    document.getElementById('menu-screen').classList.add('active');

    renderMenuCases(currentFilter);
}

document.getElementById('menu-return-btn').onclick = returnToMenu;
document.getElementById('sfx-btn').onclick = function() {
    soundOn = !soundOn;
    this.innerText = soundOn ? "🔊 ÂM THANH: BẬT" : "🔇 ÂM THANH: TẮT";
};

// Khởi tạo danh sách 8 chuyên án ngay khi mở trang
renderMenuCases('all');
updateRankBadge();