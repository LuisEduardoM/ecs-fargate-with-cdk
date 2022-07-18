import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsEcsFargate } from './ecs-fargate/aws-ecs-fargate';

export class AwsInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new AwsEcsFargate(this, 'aws-ecs-fargate', {})
  }
}
