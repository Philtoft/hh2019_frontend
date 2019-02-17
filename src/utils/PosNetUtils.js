import * as posenet from "@tensorflow-models/posenet";

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
export function isMobile() {
  return isAndroid() || isiOS();
}

export function checkAbdomenArea(keypoints, minConfidence) {
  let pointsOfInterest = {
    leftWrist: { point: keypoints[9] },
    leftHip: { point: keypoints[11] },
    rightHip: { point: keypoints[12] },
    leftShoulder: { point: keypoints[5] },
    rightShoulder: { point: keypoints[6] }
  };
  const abdomenParts = [
    {
      bodyPart: "LeftHighAbdomen",
      x_min: 0.01,
      x_max: 0.3,
      y_min: 0.01,
      y_max: 0.3
    },
    {
      bodyPart: "LeftMidAbdomen",
      x_min: 0.3,
      x_max: 0.3,
      y_min: 0.3,
      y_max: 0.6
    },
    {
      bodyPart: "LeftLowAbdomen",
      x_min: 0.01,
      x_max: 0.3,
      y_min: 0.6,
      y_max: 1
    },
    {
      bodyPart: "MidHighAbdomen",
      x_min: 0.3,
      x_max: 0.6,
      y_min: 0.01,
      y_max: 0.3
    },
    {
      bodyPart: "MidMidAbdomen",
      x_min: 0.3,
      x_max: 0.6,
      y_min: 0.3,
      y_max: 0.6
    },
    {
      bodyPart: "MidLowAbdomen",
      x_min: 0.3,
      x_max: 0.6,
      y_min: 0.6,
      y_max: 1
    },
    {
      bodyPart: "RightHighAbdomen",
      x_min: 0.6,
      x_max: 1,
      y_min: 0.01,
      y_max: 0.3
    },
    {
      bodyPart: "RightMidAbdomen",
      x_min: 0.6,
      x_max: 1,
      y_min: 0.3,
      y_max: 0.6
    },
    {
      bodyPart: "RightLowAbdomen",
      x_min: 0.6,
      x_max: 1,
      y_min: 0.6,
      y_max: 1
    }
  ];
  let confidentPoints = Object.keys(pointsOfInterest).filter(function(key) {
    return pointsOfInterest[key].point.score >= minConfidence;
  });

  if (confidentPoints.length === 5) {
    //
    const leftShoulder = pointsOfInterest["leftShoulder"].point.position;
    const rightShoulder = pointsOfInterest["rightShoulder"].point.position;
    const leftWrist = pointsOfInterest["leftWrist"].point.position;

    for (let part of abdomenParts) {
      const bodyLength = Math.abs(
        leftShoulder.y - pointsOfInterest["leftHip"].point.position.y
      );
      const bodyWidth = Math.abs(rightShoulder.x - leftShoulder.x);
      const lowerThreshold_y = leftShoulder.y + part.y_min * bodyLength;
      const upperThreshold_y = leftShoulder.y + part.y_max * bodyLength;
      const lowerThreshold_x = rightShoulder.x + part.x_min * bodyWidth;
      const upperThreshold_x = rightShoulder.x + part.x_max * bodyWidth;

      const handLocation_y = leftWrist.y;
      const handLocation_x = leftWrist.x;

      if (
        lowerThreshold_y < handLocation_y &&
        handLocation_y < upperThreshold_y &&
        (lowerThreshold_x < handLocation_x && handLocation_x < upperThreshold_x)
      ) {
        return {
          bodyPart: part.bodyPart,
          isBodyPart: true,
          positions: leftWrist
        };
      }
    }
  }
  return { bodyPart: "None", isBodyPart: false, positions: null };
}
export function drawKeypoints(
  keypoints,
  minConfidence,
  skeletonColor,
  ctx,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const { y, x } = keypoint.position;
      ctx.beginPath();
      ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI);
      ctx.fillStyle = skeletonColor;
      ctx.fill();
    }
  });
}

function toTuple({ y, x }) {
  return [y, x];
}
function drawSegment([ay, ax], [by, bx], color, lineWidth, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  ctx,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      ctx
    );
  });
}
export function takeSnapshot(
  canvas,
  selection,
  highLightColor,
  video,
  videoWidth,
  videoHeight
) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, videoWidth, videoHeight);
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-videoWidth, 0);
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  ctx.restore();
  console.log(selection);
  ctx.beginPath();
  ctx.arc(selection.x, selection.y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = highLightColor;
  ctx.fill();
  const snapshot = canvas.toDataURL({
    format: "jpeg",
    quality: 1
  });

  return snapshot;
}
