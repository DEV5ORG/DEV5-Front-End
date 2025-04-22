import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { ThemedText } from "./themed-text";
import { observer } from "mobx-react-lite";
import { Colors } from "@/constants/Colors";

interface IChartData {
  label: string;
  percentage: number;
  color: string;
}

interface IBudgetChartProps {
  data: IChartData[];
  total: number;
}

const BudgetChart = observer(({ data, total }: IBudgetChartProps) => {
  const radius = 40;
  const strokeWidth = 20;
  const center = 50;
  const circumference = 2 * Math.PI * radius;

  let rotation = -90;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Presupuesto Consumido</ThemedText>
      <View style={styles.content}>
        <Svg width={100} height={100} viewBox="0 0 100 100">
          <G rotation="0" origin={`${center}, ${center}`}>
            {data.map((item, index) => {
              const strokeDasharray = `${
                (circumference * item.percentage) / 100
              }, ${circumference}`;
              const currentRotation = rotation;
              rotation += (item.percentage * 360) / 100;

              return (
                <Circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={strokeDasharray}
                  rotation={currentRotation}
                  origin={`${center}, ${center}`}
                />
              );
            })}
          </G>
        </Svg>

        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <ThemedText style={styles.total}>Total: ₡{total || 0}</ThemedText>
    </View>
  );
});

export default BudgetChart;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  legend: {
    marginLeft: 20,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 8,
    borderRadius: 2,
  },
  total: {
    fontWeight: "bold",
    marginTop: 20,
  },
});
