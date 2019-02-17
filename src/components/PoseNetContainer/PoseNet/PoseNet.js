import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import {
  isMobile,
  drawKeypoints,
  drawSkeleton,
  checkMidStomach
} from "../../../utils/PosNetUtils";
import "./PoseNet.scss";

export default class PoseNet extends Component {
  static defaultProps = {
    videoWidth: 600,
    videoHeight: 480,
    flipHorizontal: true,
    mobileNetArchitecture: isMobile() ? 0.5 : 0.75,
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.5,
    minPartConfidence: 0.7,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: "aqua",
    skeletonLineWidth: 2,
    loadingText: "Please wait"
  };

  constructor(props) {
    super(props, PoseNet.defaultProps);
    this.state = {
      loading: true,
      isMidStomach: false,
      isFlippedLogic: false,
      count: 0,
      timer_counts: 2
    };
  }

  async componentWillMount() {
    this.net = await posenet.load(this.props.mobileNetArchitecture);
  }

  async componentDidMount() {
    try {
      await this.setupCamera();
    } catch (e) {
      throw new Error("Please enable your camera");
    } finally {
      this.setState({ loading: false });
    }
    this.detectPose();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //Timer stuff starts
  tick() {
    if (this.state.count === this.state.timer_counts) {
      this.stopTimer();
    }
    this.setState({ count: this.state.count + 1 });
  }
  startTimer() {
    console.log("Timer started!");
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  stopTimer() {
    console.log("Timer stoped!");

    if (!this.state.isFlippedLogic) {
      //Flip the logic, wait untill the hand is removed
      console.log("YOU SHOW YOUR BELLY !!");
      this.setState({ isFlippedLogic: true });
    } else {
      //TODO actual state change
      this.setState({ isFlippedLogic: false });
      console.log("YOU  DON'T SHOW YOUR BELLY !!");
    }

    clearInterval(this.timer);
    this.setState({ count: 0 });
  }
  //Timer stuff ends

  getCanvas = elem => {
    this.canvas = elem;
  };

  getVideo = elem => {
    this.video = elem;
  };

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }

    const { videoWidth, videoHeight } = this.props;
    const video = this.video;
    const mobile = isMobile();

    video.width = videoWidth;
    video.height = videoHeight;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: mobile ? void 0 : videoWidth,
        height: mobile ? void 0 : videoHeight
      }
    });

    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video metadata is ready, we can start streaming video
        video.play();
        resolve(video);
      };
    });
  }

  poseDetectionFrame(ctx) {
    const {
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props;

    const net = this.net;
    const video = this.video;
    const poseDetectionFrameInner = async () => {
      const pose = await net.estimateSinglePose(
        video,
        imageScaleFactor,
        flipHorizontal,
        outputStride
      );
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      if (showVideo) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();
      }

      if (pose.score >= minPoseConfidence) {
        if (showPoints) {
          drawKeypoints(pose.keypoints, minPartConfidence, skeletonColor, ctx);
          const pointsToMidStomach = checkMidStomach(
            pose.keypoints,
            minPartConfidence
          );
          if (pointsToMidStomach !== this.state.isMidStomach) {
            this.setState({ isMidStomach: pointsToMidStomach });
            pointsToMidStomach ? this.startTimer() : this.stopTimer();
          }
        }
        if (showSkeleton) {
          drawSkeleton(
            pose.keypoints,
            minPartConfidence,
            skeletonColor,
            skeletonLineWidth,
            ctx
          );
        }
      }

      requestAnimationFrame(poseDetectionFrameInner);
    };
    poseDetectionFrameInner();
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props;
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    this.poseDetectionFrame(ctx);
  }

  render() {
    const loading = this.state.loading ? (
      <div className="PoseNet__loading">{this.props.loadingText}</div>
    ) : (
      ""
    );
    return (
      <div>
      <p className="message">
          Now, point to the pain area with your left hand and / or right hand
        </p>
      <div className="PoseNet">
        {loading}
        {/* <video playsInline ref={this.getVideo} />
        <canvas ref={this.getCanvas} /> */}
      </div>
      </div>
    );
  }
}
