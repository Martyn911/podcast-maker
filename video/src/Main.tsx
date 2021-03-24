import {
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	Audio,
} from 'remotion';
import {Title} from './Podcast/Title';
import {Bars} from './Podcast/Bars';
import {Transition} from './Podcast/Transition';

export const Main: React.FC<{
	textProps: {
		duration: number;
		text: string;
	}[];
}> = ({textProps}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	let initialFrame = 10;

	return (
		<div
			style={{
				flex: 1,
				background:
					'linear-gradient(170deg, #7AABD0 -1%, rgba(76, 109, 173, 0.796875) 30.99%, rgba(27, 47, 88, 0) 96.05%), #1B2F58',
			}}
		>
			<div style={{opacity}}>
				{textProps.map((prop, index) => {
					initialFrame =
						videoConfig.fps * prop.duration + initialFrame;

					return (
						<>
							<Sequence
								from={
									initialFrame -
									videoConfig.fps * prop.duration
								}
								durationInFrames={
									videoConfig.fps * prop.duration
								}
							>
								<Bars />
							</Sequence>
							<Sequence
								from={
									initialFrame -
									videoConfig.fps * prop.duration
								}
								durationInFrames={
									videoConfig.fps * prop.duration
								}
							>
								<Title titleText={prop.text} />
							</Sequence>
							{index < textProps.length - 1 ? (
								<Sequence
									from={initialFrame}
									durationInFrames={87}
								>
									<Transition />
								</Sequence>
							) : (
								<> </>
							)}
							<p style={{display: 'none'}}>
								{(initialFrame += 87)}
							</p>
						</>
					);
				})}
			</div>
		</div>
	);
};
