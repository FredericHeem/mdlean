const url = "https://github.com/grucloud/grucloud/";
const branch = "main";

export const PROJECTS = [
  {
    title: "EC2 an instance with public address",
    description:
      "Deploy a EC2 virtual machine attached to an elastic public address",
    url,
    branch,
    directory: "examples/aws/ec2",
  },
  {
    title: "EKS",
    description: "Deploy a kubernetes cluster with EKS",
    url,
    branch,
    directory: "packages/modules/aws/eks/example",
  },
];
