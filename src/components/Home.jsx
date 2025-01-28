import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as poseDetection from "@tensorflow-models/pose-detection";
import p5 from "p5";
import { useRecoilValue } from "recoil";
import { colourTheme } from "../cart/Theme";

export const Home = () => {
    const currentTheme = useRecoilValue(colourTheme);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    let detector = null;
    let poses = [];
    let skeleton = true;

    let pushUps = 0;
    let squats = 0;
    let bicepCurls = 0;

    let isPushUpDown = false;
    let isSquatDown = false;
    let isCurlUp = false;

    useEffect(() => {
        const sketch = (p) => {
            let video;

            p.setup = async () => {
                await tf.ready();
                await tf.setBackend("webgl");
                console.log("Using TensorFlow backend:", tf.getBackend());

                // Set canvas size
                p.createCanvas(640, 480);
                video = p.createCapture(p.VIDEO);
                video.size(640, 480);
                video.hide();
                videoRef.current = video;

                try {
                    detector = await poseDetection.createDetector(
                        poseDetection.SupportedModels.MoveNet,
                        {
                            modelType:
                                poseDetection.movenet.modelType
                                    .SINGLEPOSE_THUNDER,
                        }
                    );
                    console.log("MoveNet model loaded successfully.");
                    getPoses();
                } catch (error) {
                    console.error("Error loading MoveNet model:", error);
                }

                // Resize canvas to match window size
                const handleResize = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                };
                window.addEventListener("resize", handleResize);

                // Cleanup
                return () => {
                    window.removeEventListener("resize", handleResize);
                };
            };

            p.draw = () => {
                p.background(220);

                if (video) {
                    p.translate(p.width, 0);
                    p.scale(-1, 1);
                    p.image(video, 0, 0, video.width, video.height);

                    drawKeypoints(p);
                    if (skeleton) drawSkeleton(p);

                    p.fill(255);
                    p.strokeWeight(2);
                    p.stroke(51);
                    p.textSize(20);
                    p.translate(p.width, 0);
                    p.scale(-1, 1);

                    p.text(`Push-ups: ${pushUps}`, 20, 30);
                    p.text(`Squats: ${squats}`, 20, 60);
                    p.text(`Bicep Curls: ${bicepCurls}`, 20, 90);

                    p.text(
                        poses.length > 0
                            ? "Skeleton Detected"
                            : "Detecting Pose...",
                        20,
                        120
                    );
                }
            };

            const getPoses = async () => {
                if (video && detector) {
                    try {
                        const estimation = await detector.estimatePoses(
                            video.elt
                        );
                        if (estimation.length > 0) {
                            poses = estimation;
                            detectPushUp();
                            detectSquat();
                            detectBicepCurl();
                        }
                    } catch (error) {
                        console.error("Error estimating poses:", error);
                    }
                    setTimeout(getPoses, 100);
                }
            };

            const detectPushUp = () => {
                if (poses.length > 0) {
                    const keypoints = poses[0].keypoints;
                    const leftShoulder = keypoints[5];
                    const rightShoulder = keypoints[6];
                    const leftElbow = keypoints[7];
                    const rightElbow = keypoints[8];
                    const leftWrist = keypoints[9];
                    const rightWrist = keypoints[10];

                    if (
                        leftShoulder.score > 0.5 &&
                        rightShoulder.score > 0.5 &&
                        leftElbow.score > 0.5 &&
                        rightElbow.score > 0.5
                    ) {
                        const angleLeft = calculateAngle(
                            leftShoulder.x,
                            leftShoulder.y,
                            leftElbow.x,
                            leftElbow.y,
                            leftWrist.x,
                            leftWrist.y
                        );
                        const angleRight = calculateAngle(
                            rightShoulder.x,
                            rightShoulder.y,
                            rightElbow.x,
                            rightElbow.y,
                            rightWrist.x,
                            rightWrist.y
                        );

                        if (angleLeft < 90 && angleRight < 90) {
                            isPushUpDown = true;
                        } else if (
                            isPushUpDown &&
                            angleLeft > 160 &&
                            angleRight > 160
                        ) {
                            isPushUpDown = false;
                            pushUps++;
                        }
                    }
                }
            };

            const detectSquat = () => {
                if (poses.length > 0) {
                    const keypoints = poses[0].keypoints;
                    const leftHip = keypoints[11];
                    const rightHip = keypoints[12];
                    const leftKnee = keypoints[13];
                    const rightKnee = keypoints[14];
                    const leftAnkle = keypoints[15];
                    const rightAnkle = keypoints[16];

                    if (
                        leftHip.score > 0.5 &&
                        rightHip.score > 0.5 &&
                        leftKnee.score > 0.5 &&
                        rightKnee.score > 0.5 &&
                        leftAnkle.score > 0.5 &&
                        rightAnkle.score > 0.5
                    ) {
                        const angleLeftKnee = calculateAngle(
                            leftHip.x,
                            leftHip.y,
                            leftKnee.x,
                            leftKnee.y,
                            leftAnkle.x,
                            leftAnkle.y
                        );
                        const angleRightKnee = calculateAngle(
                            rightHip.x,
                            rightHip.y,
                            rightKnee.x,
                            rightKnee.y,
                            rightAnkle.x,
                            rightAnkle.y
                        );

                        if (angleLeftKnee < 150 && angleRightKnee < 150) {
                            isSquatDown = true;
                        } else if (
                            isSquatDown &&
                            angleLeftKnee > 170 &&
                            angleRightKnee > 170
                        ) {
                            isSquatDown = false;
                            squats++;
                        }
                    }
                }
            };

            const detectBicepCurl = () => {
                if (poses.length > 0) {
                    const keypoints = poses[0].keypoints;
                    const leftShoulder = keypoints[5];
                    const leftElbow = keypoints[7];
                    const leftWrist = keypoints[9];

                    if (
                        leftShoulder.score > 0.5 &&
                        leftElbow.score > 0.5 &&
                        leftWrist.score > 0.5
                    ) {
                        const leftElbowAngle = calculateAngle(
                            leftShoulder.x,
                            leftShoulder.y,
                            leftElbow.x,
                            leftElbow.y,
                            leftWrist.x,
                            leftWrist.y
                        );

                        if (leftElbowAngle < 60) {
                            isCurlUp = true;
                        } else if (isCurlUp && leftElbowAngle > 150) {
                            isCurlUp = false;
                            bicepCurls++;
                        }
                    }
                }
            };

            const calculateAngle = (x1, y1, x2, y2, x3, y3) => {
                const angle =
                    Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y1 - y2, x1 - x2);
                return Math.abs(angle * (180 / Math.PI));
            };

            const drawKeypoints = (p) => {
                if (poses.length > 0) {
                    for (let kp of poses[0].keypoints) {
                        const { x, y, score } = kp;
                        if (score > 0.5) {
                            p.fill(0, 255, 0);
                            p.stroke(255);
                            p.strokeWeight(2);
                            p.circle(x, y, 8);
                        }
                    }
                }
            };

            const drawSkeleton = (p) => {
                const adjacentPairs = poseDetection.util.getAdjacentPairs(
                    poseDetection.SupportedModels.MoveNet
                );

                if (poses.length > 0) {
                    for (const [i, j] of adjacentPairs) {
                        const kp1 = poses[0].keypoints[i];
                        const kp2 = poses[0].keypoints[j];
                        if (kp1.score > 0.5 && kp2.score > 0.5) {
                            p.strokeWeight(2);
                            p.stroke(0, 255, 0);
                            p.line(kp1.x, kp1.y, kp2.x, kp2.y);
                        }
                    }
                }
            };
        };

        const p5Instance = new p5(sketch, canvasRef.current);

        return () => {
            p5Instance.remove();
        };
    }, []);

    return (
        <div
            className={`grid grid-rows-1 grid-cols-1 p-3 font-mono text-xl gap-4 font-semibold shadow-md ${
                currentTheme === "dark"
                    ? "bg-black text-white"
                    : "bg-amber-50 text-black"
            }`}
        >
            <h1 className="text-xl text-center font-bold">Form Detection</h1>
            <div className="flex justify-center items-center">
                <div ref={canvasRef}></div>
            </div>
        </div>
    );
};

export default Home;
