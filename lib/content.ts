export const profile = {
	name: "Joseph Ikem",
	email: "ikemnomsodev@gmail.com",
	location: "Lagos, Nigeria",
	github: "https://github.com/swish933",
	linkedin: "https://linkedin.com/in/ikemnomso",
	resume: "/Joseph_Ikem_Resume.pdf",
};
export type Project = {
	slug: string;
	index: string;
	title: string;
	category: string;
	heading: string;
	summary: string;
	url: string;
	stack: string[];
	role: string;
	capabilities: string[];
	problem: string;
	contribution: string[];
	architecture: { title: string; tech: string; body: string }[];
	decisions: { title: string; body: string }[];
	next: string;
};
export const projects: Project[] = [
	{
		slug: "co-invest",
		index: "01",
		title: "Co-Invest",
		category: "Full-stack · Investment platform",
		heading: "Connecting ambition\nwith opportunity.",
		summary:
			"A platform connecting investors with entrepreneurs and ventures, supporting business growth across Africa.",
		url: "https://coinvest-test-ui.netlify.app",
		stack: ["React", "Tailwind CSS", "Express", "MongoDB", "Keycloak", "n8n"],
		role: "Full-stack development",
		capabilities: [
			"Venture discovery and profiles",
			"Investor and entrepreneur journeys",
			"Authentication and email workflows",
		],
		problem:
			"Investors need a clear way to explore ventures. Entrepreneurs need a place to present their businesses. Co-Invest brings both audiences into one application, with dedicated journeys and structured venture information.",
		contribution: [
			"Built interfaces for venture discovery, venture information and account onboarding using React and Tailwind CSS.",
			"Developed Express APIs and MongoDB-backed workflows for the platform’s users and venture records.",
			"Integrated Keycloak authentication and n8n email automation into the application.",
		],
		architecture: [
			{
				title: "Interface",
				tech: "React · Tailwind CSS",
				body: "Venture browsing, account onboarding and responsive application views.",
			},
			{
				title: "Application",
				tech: "Express",
				body: "API endpoints connect the interface to business workflows and stored records.",
			},
			{
				title: "Data",
				tech: "MongoDB",
				body: "Document storage for users, venture information and related platform data.",
			},
			{
				title: "Identity & communication",
				tech: "Keycloak · n8n",
				body: "Authentication is handled through Keycloak; email workflows run through n8n.",
			},
		],
		decisions: [
			{
				title: "A dedicated identity service",
				body: "Keycloak separates identity management from application data. Integrating it requires careful handling of redirects, tokens and user records across the client and API.",
			},
			{
				title: "Email as a separate workflow",
				body: "n8n provides a dedicated place for email automation. The application initiates a workflow while the email steps remain separate from the interface.",
			},
			{
				title: "Two audiences, one platform",
				body: "Investor and entrepreneur journeys share a visual system while presenting different information and forms for each role.",
			},
		],
		next: "eventful",
	},
	{
		slug: "eventful",
		index: "02",
		title: "Eventful",
		category: "Full-stack · Event management",
		heading: "From finding an event\nto being there.",
		summary:
			"Event creation, paid attendance and scheduled reminders, with a QR code attached to each successful order.",
		url: "https://eventful-client.netlify.app/",
		stack: ["Next.js", "Express", "MongoDB", "BullMQ", "Redis", "Paystack"],
		role: "Full-stack development",
		capabilities: [
			"Event creation and scheduling",
			"Hosted checkout and order QR codes",
			"Event and personal email reminders",
		],
		problem:
			"An event platform needs to serve two connected workflows: organisers publishing events and attendees paying to attend. Eventful brings event details, ticket orders and scheduled reminders into a single application.",
		contribution: [
			"Built organiser and attendee experiences in Next.js, including event creation, event browsing and ticket views.",
			"Developed Express endpoints and MongoDB models for events, orders and reminders, with Paystack hosted checkout.",
			"Implemented scheduled background jobs with BullMQ and Redis for event reminders and attendees’ personal reminders.",
		],
		architecture: [
			{
				title: "Interface",
				tech: "Next.js",
				body: "Organiser dashboards, event pages, order views and personal reminder forms.",
			},
			{
				title: "Application & data",
				tech: "Express · MongoDB",
				body: "Event records, ticket orders and reminder data are managed through the API.",
			},
			{
				title: "Payments",
				tech: "Paystack",
				body: "Attendees leave the application for hosted checkout, then return to check their order status.",
			},
			{
				title: "Background jobs",
				tech: "BullMQ · Redis",
				body: "Scheduled reminder jobs run separately from the web request and trigger email dispatch.",
			},
		],
		decisions: [
			{
				title: "Hosted payment checkout",
				body: "Redirecting to Paystack keeps card entry inside the payment provider’s interface. The return journey still needs to account for pending, successful and failed orders.",
			},
			{
				title: "Reminders outside the request cycle",
				body: "BullMQ and Redis let reminder work run at a scheduled time instead of keeping an HTTP request open. The organiser’s event reminder and the attendee’s personal reminder are separate inputs.",
			},
			{
				title: "An order-level QR code",
				body: "The QR code belongs to an order, which can contain multiple tickets. The ticket interface keeps the order quantity visible alongside the code.",
			},
		],
		next: "co-invest",
	},
	{
		slug: "onyemmemme",
		index: "03",
		title: "Onyemmemme",
		category: "Client website · Business showcase",
		heading: "A direct path from\ninterest to inquiry.",
		summary:
			"A business showcase where visitors explore products and send their interest directly to the business owner.",
		url: "https://onyemmemme.com/",
		stack: ["React", "Tailwind CSS", "Sanity CMS"],
		role: "Frontend & CMS development",
		capabilities: [
			"Business and product presentation",
			"Product interest forms",
			"CMS-managed content",
		],
		problem:
			"The business needed a website that could present its offerings and help prospective customers make contact about a specific product. The experience centres on browsing and expressing interest.",
		contribution: [
			"Built a responsive business and product showcase with React and Tailwind CSS.",
			"Integrated Sanity CMS to support content management.",
			"Implemented the product-interest form journey that sends inquiries to the business owner.",
		],
		architecture: [
			{
				title: "Presentation",
				tech: "React · Tailwind CSS",
				body: "Reusable interface components for business information, products and inquiries.",
			},
			{
				title: "Content",
				tech: "Sanity CMS",
				body: "Structured content is managed separately from the site’s interface.",
			},
			{
				title: "Customer journey",
				tech: "Product interest form",
				body: "Visitors choose a product and submit their interest to the business owner.",
			},
		],
		decisions: [
			{
				title: "Content that can change",
				body: "A CMS lets business content evolve without putting every update through a frontend code change.",
			},
			{
				title: "A focused conversion journey",
				body: "The primary action is expressing interest in a product. The site supports that action with an inquiry form connected to the relevant offering.",
			},
		],
		next: "emjay",
	},
	{
		slug: "emjay",
		index: "04",
		title: "Client Portfolio",
		category: "Client website · Personal portfolio",
		heading: "Making someone’s\nwork the focus.",
		summary:
			"A responsive portfolio website built to present a client’s work and personal profile.",
		url: "https://emjayportfolio.netlify.app/",
		stack: ["Next.js", "Tailwind CSS"],
		role: "Frontend development",
		capabilities: [
			"Personal profile and selected work",
			"Responsive page layouts",
			"Reusable interface components",
		],
		problem:
			"A personal portfolio needs to make its owner’s work easy to explore. This project focuses on a clear presentation, responsive layouts and a consistent visual language.",
		contribution: [
			"Built the client portfolio in Next.js.",
			"Implemented responsive layouts and styling with Tailwind CSS.",
			"Organised the interface into reusable components for consistent presentation.",
		],
		architecture: [
			{
				title: "Page structure",
				tech: "Next.js",
				body: "Page composition and navigation for the portfolio experience.",
			},
			{
				title: "Visual system",
				tech: "Tailwind CSS",
				body: "Responsive typography, spacing and layouts across screen sizes.",
			},
		],
		decisions: [
			{
				title: "Let the work lead",
				body: "The portfolio’s structure gives the client’s work and profile a clear hierarchy, helping visitors understand what they do.",
			},
			{
				title: "Consistency across screen sizes",
				body: "Reusable components and responsive styling keep the content readable on desktop and mobile.",
			},
		],
		next: "onyemmemme",
	},
];
export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
export const experience = [
	{
		role: "Lead Frontend Engineer",
		company: "Integrated Software Services Limited",
		period: "Mar 2025 — Present",
		body: "Building React and Next.js interfaces, developing Express services, integrating authentication, and mentoring engineers through code reviews and debugging.",
	},
	{
		role: "Full-Stack Developer",
		company: "Freelance",
		period: "Jan 2021 — Dec 2024",
		body: "Delivered web applications and client websites with React, Next.js and Node.js, including CMS integrations and deployments.",
	},
];
