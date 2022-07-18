import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";

export class AwsEcsFargate extends NestedStack {
    constructor(scope: Construct, id: string, props?: NestedStackProps) {
        super(scope, id, props)

        const vpc = new ec2.Vpc(this, 'aws-infra-vpc', {})

        const cluster = new ecs.Cluster(this, 'aws-infra-cluster', {
            vpc,
            clusterName: 'application-cluster'
        })


        const fargateService = new ApplicationLoadBalancedFargateService(this,'aws-infra-load-balanced-application', {
            cluster: cluster,
            cpu: 1024,
            memoryLimitMiB: 2048,
            desiredCount: 2,
            taskImageOptions: {
                image: ecs.ContainerImage.fromAsset('../app'),
                containerPort: 8080
            }
        })

        fargateService.targetGroup.configureHealthCheck({
            path: '/actuator/health',
            healthyHttpCodes: '200'
        })

        const autoScaleTask = fargateService.service.autoScaleTaskCount({
            maxCapacity: 6,
            minCapacity: 2
        })

        autoScaleTask.scaleOnCpuUtilization('cpu-autoscaling', {
            targetUtilizationPercent: 50,
            policyName: 'cpu-autoscaling-policy'
        })
    }
}