// import Image from "next/image";
// export function ProjectArt({
// 	slug,
// 	large = false,
// }: {
// 	slug: string;
// 	large?: boolean;
// }) {
// 	return (
// 		<figure
// 			className={`project-art art-${slug} ${large ? "art-large" : ""}`}
// 			aria-label={`Illustrated overview of ${slug === "emjay" ? "the client portfolio" : slug}`}
// 		>
// 			<div className='art-meta'>
// 				<span>Project study</span>
// 				<span>Interface / Workflow</span>
// 			</div>
// 			{slug === "co-invest" ? (
// 				// <div className="coinvest-art">
// 				//   <div className="mini-nav">
// 				//     <strong>
// 				//       <span className="co-mark">c.</span> Co-Invest
// 				//     </strong>
// 				//     <span>
// 				//       Capital meets innovation <Arrow />
// 				//     </span>
// 				//   </div>
// 				//   <div className="coinvest-message">
// 				//     <span className="mini-eyebrow">
// 				//       Connecting Africa’s next chapter
// 				//     </span>
// 				//     <p>
// 				//       Ambition, meet
// 				//       <br />
// 				//       <em>opportunity.</em>
// 				//     </p>
// 				//   </div>
// 				//   <div className="venture-grid">
// 				//     {["Entrepreneurs", "Ventures", "Investors"].map((x, i) => (
// 				//       <div key={x}>
// 				//         <span className="venture-symbol">
// 				//           {i === 0 ? "↗" : i === 1 ? "◈" : "◎"}
// 				//         </span>
// 				//         <small>0{i + 1}</small>
// 				//         <strong>{x}</strong>
// 				//         <span>
// 				//           {
// 				//             [
// 				//               "Present an idea",
// 				//               "Build a business",
// 				//               "Discover potential",
// 				//             ][i]
// 				//           }
// 				//         </span>
// 				//       </div>
// 				//     ))}
// 				//   </div>
// 				//   <div className="art-bottom">
// 				//     <span>DISCOVER</span>
// 				//     <span>CONNECT</span>
// 				//     <span>GROW</span>
// 				//   </div>
// 				// </div>
// 				<Image
// 					className='hover:-translate-y-0.75 transition-transform'
// 					src={"/app_screenshots/Screenshot 2026-11-19 at 15.36.53.png"}
// 					width={790}
// 					height={360}
// 					alt=''
// 				/>
// 			) : slug === "eventful" ? (
// 				<div className='eventful-art'>
// 					<div className='mini-nav'>
// 						<strong>
// 							<span className='event-logo'>e</span> eventful
// 						</strong>
// 						<span>
// 							Make it an occasion <Arrow />
// 						</span>
// 					</div>
// 					<div className='event-art-body'>
// 						<div>
// 							<span className='mini-eyebrow'>
// 								The moments worth showing up for
// 							</span>
// 							<p>
// 								Find your
// 								<br />
// 								<em>next moment.</em>
// 							</p>
// 							<div className='event-flow'>
// 								<span>Discover</span>
// 								<i>→</i>
// 								<span>Book</span>
// 								<i>→</i>
// 								<span>Attend</span>
// 							</div>
// 						</div>
// 						<div className='ticket-art'>
// 							<div>
// 								<Mark />
// 								<span>
// 									EVENTFUL
// 									<br />
// 									ORDER PASS
// 								</span>
// 							</div>
// 							<strong>
// 								You’re
// 								<br />
// 								going.
// 							</strong>
// 							<span className='ticket-rule' />
// 							<div className='ticket-lower'>
// 								<span>
// 									YOUR EVENT
// 									<br />
// 									<b>YOUR EXPERIENCE</b>
// 								</span>
// 								<span className='ticket-star'>✳</span>
// 							</div>
// 							<div className='barcode' />
// 							<span className='ticket-foot'>A moment to look forward to</span>
// 						</div>
// 					</div>
// 				</div>
// 			) : slug === "onyemmemme" ? (
// 				<div className='business-art'>
// 					<div className='mini-nav'>
// 						<strong>ONYEMMEMME</strong>
// 						<span>
// 							Explore our businesses <Arrow />
// 						</span>
// 					</div>
// 					<div className='business-title'>
// 						<span className='mini-eyebrow'>Discover / Explore / Connect</span>
// 						<p>
// 							Good business.
// 							<br />
// 							<em>Closer to you.</em>
// 						</p>
// 					</div>
// 					<div className='business-grid'>
// 						<div className='abstract-object object-one' />
// 						<div className='abstract-object object-two' />
// 						<div className='business-inquiry'>
// 							<small>Interested in a product?</small>
// 							<strong>Let’s talk.</strong>
// 							<span>
// 								Register your interest <Arrow />
// 							</span>
// 						</div>
// 					</div>
// 				</div>
// 			) : (
// 				<div className='emjay-art'>
// 					<div className='mini-nav'>
// 						<strong>EMJAY</strong>
// 						<span>Selected work / Profile</span>
// 					</div>
// 					<div className='emjay-title'>
// 						<small>A personal portfolio</small>
// 						<p>
// 							A point
// 							<br />
// 							of <em>view.</em>
// 						</p>
// 						<div className='emjay-composition'>
// 							<span />
// 							<span />
// 							<span />
// 						</div>
// 					</div>
// 					<div className='art-bottom'>
// 						<span>WORK</span>
// 						<span>PROFILE</span>
// 						<span>CONTACT ↗</span>
// 					</div>
// 				</div>
// 			)}
// 			<figcaption>
// 				Illustrated project overview{" "}
// 				<span>
// 					Visit the live site for the application <Arrow />
// 				</span>
// 			</figcaption>
// 		</figure>
// 	);
// }

import Image from "next/image";
import { Mark, Arrow } from "./icons";

const screenshots: Record<string, string> = {
	"co-invest": "/app_screenshots/co-invest.png",
	eventful: "/app_screenshots/eventful.png",
	onyemmemme: "/app_screenshots/onyemmemme.png",
	emjay: "/app_screenshots/emjay.png",
};

export function ProjectArt({
	slug,
	large = false,
}: {
	slug: string;
	large?: boolean;
}) {
	return (
		<figure
			className={`project-art art-${slug} ${large ? "art-large" : ""}`}
			aria-label={`Illustrated overview of ${slug === "emjay" ? "the client portfolio" : slug}`}
		>
			<div className='art-meta'>
				<span>Project study</span>
				<span>Interface / Workflow</span>
			</div>

			<div className='art-frame'>
				<Image
					src={screenshots[slug]}
					alt=''
					fill
					sizes='(max-width: 900px) 100vw, 790px'
					className='object-cover object-top'
				/>
			</div>

			<figcaption>
				Illustrated project overview{" "}
				<span>
					Visit the live site for the application <Arrow />
				</span>
			</figcaption>
		</figure>
	);
}
