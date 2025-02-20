import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EventCardProps } from "@/interfaces/event-card.interface";
import { Colors } from "@/assets/constants/Colors";

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  location,
  onEdit,
  isEditable,
  totalPrice,
  food,
  place,
  entertainment,
}) => {
  const [expanded, setExpanded] = useState(false);

  const renderSection = (sectionTitle: string, data: any) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {Object.entries(data).map(([key, value]) => {
        // Skip certain fields we don't want to display
        if (key === 'image' || key === 'isEditable') return null;
        
        return (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            </Text>
            <Text style={styles.detailValue}>{value as string}</Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={[styles.card, expanded && styles.expandedCard]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color={Colors.icon} />
          <Text style={styles.infoText}>{date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color={Colors.icon} />
          <Text style={styles.infoText}>{location}</Text>
        </View>

        {isEditable && (
          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() => setExpanded(!expanded)}
          >
            <Text style={styles.moreInfoText}>
              {expanded ? 'Menos información' : 'Más información'}
            </Text>
          </TouchableOpacity>
        )}

        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceLabel}>Precio Total:</Text>
              <Text style={styles.totalPriceValue}>{totalPrice}</Text>
            </View>

            {renderSection('Lugar', place)}
            {renderSection('Comida', food)}
            {renderSection('Entretenimiento', entertainment)}

            <TouchableOpacity
              style={styles.editButton}
              onPress={onEdit}
            >
              <Text style={styles.editButtonText}>Editar Evento</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  expandedCard: {
    marginVertical: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: Colors.icon,
    fontSize: 14,
  },
  moreInfoButton: {
    backgroundColor: Colors.link,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  moreInfoText: {
    color: 'white',
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.black,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
    backgroundColor: Colors.backgroundLight,
    padding: 8,
    borderRadius: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.icon,
  },
  detailValue: {
    flex: 2,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'right',
  },
  editButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EventCard;