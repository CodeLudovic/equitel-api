require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);

const sendEmail = async (task) => {
	const template = ` <div>
                <h3>Se le ha asignado una tarea por el usuario: ${task.title}</h3>
                <p>${task.description}</p>
                <p>Tarea Asignada por: ${task.user_creator}</p>
            </div>
            `;
	try {
		await resend.emails.send({
			from: "Habitask Test <admin@whitebeartech.com.co>",
			to: [`${task.user_assign}`],
			subject: "Tarea Asignada",
			html: `${template}`,
		});
	} catch (error) {
		console.log("Error al enviar el correo: ", error);
	}
};

const sendEmailCompleteTask = async (task) => {
	const template = ` <div>
				<h3>Se ha completado la tarea: ${task.title}</h3>
                <h2>ID tarea: ${task.id}</h2>
                <p>Por el usuario: ${task.user_assign}</p>
            </div>
            `;
	try {
		await resend.emails.send({
			from: "Habitask Test <admin@whitebeartech.com.co>",
			to: [`${task.user_creator}`],
			subject: "Tarea Asignada",
			html: `${template}`,
		});
	} catch (error) {
		console.log("Error al enviar el correo: ", error);
	}
};

module.exports = { sendEmail, sendEmailCompleteTask };
