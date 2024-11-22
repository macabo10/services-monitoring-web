const Docker = require('dockerode');
const nodemailer = require('nodemailer');

const docker = new Docker();
const checkInterval = 10000; // nó check mỗi 10 giây

// Các biến container để check
const monitoredContainers = [
    { name: 'gold_price_service_no1', port: '3008', status: 'unknown' },
    { name: 'gold_price_service_no2', port: '3009', status: 'unknown' },
    { name: 'exchange_rate_service_no1', port: '3004', status: 'unknown' },
    { name: 'exchange_rate_service_no2', port: '3005', status: 'unknown' },
];

// config cái connection vs yahoo các thứ để gửi mail
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true,
    auth: {
        user: 'pixelend2003@yahoo.com.vn',
        pass: 'wjvnvezkawqqxsad',
    },
});

const recipient = 'daavenspicks@gmail.com'; 


// Đây là hàm gửi mail, dòng 39 là lệnh gửi: nhận vào cái set up connection transporter kia và cái mailoptions chứa subject content
const sendNotification = async (containerName, port) => {
    const mailOptions = {
        from: 'pixelend2003@yahoo.com.vn',
        to: recipient,
        subject: `Docker Container Down: ${containerName}`,
        text: `The Docker container ${containerName} (running at localhost:${port}) is now down.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent for ${containerName}`);
    } catch (error) {
        console.error(`Failed to send email for ${containerName}:`, error);
    }
};

// Hàm check status của container nếu up -> down thì trigger hàm gửi mail ở trên
const checkContainerStatus = async () => {
    try {
        //fetch hết container: cái containers bayh chứa tên các container đi kèm vs status hiện tại của nó
        const containers = await docker.listContainers({ all: true });

        //loop để check từng container
        monitoredContainers.forEach((monitored) => {
            const container = containers.find(c =>
                c.Names.some(name => name.includes(monitored.name))
            );

            const newStatus = container && container.State === 'running' ? 'up' : 'down';

            // IF CHỈ XẢY RA NẾU STATUS TRƯỚC UP SAU DOWN
            if (monitored.status === 'up' && newStatus === 'down') {
                sendNotification(monitored.name, monitored.port);
            }

            monitored.status = newStatus; // gán status mới vào cái monitored (LUÔN XẢY RA)
        });
    } catch (error) {
        console.error('Error checking container status:', error);
    }
};

// Periodically check the status
setInterval(checkContainerStatus, checkInterval);